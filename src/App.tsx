import TopBar from "./components/TopBar";
import Section from "./components/Section.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState<any>(null);
  const [apiData2, setApiData2] = useState<any>(null);
  const [aIData, setAIData] = useState<any>(null);

  useEffect(() => {
    if (apiData && apiData2) {
      const section = document.getElementById("container");
      if (section) {
        section.style.display = "block";
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      }
    }
  }, [apiData, apiData2]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
        }),
      });

      const data = await response.json(); //stringi objeye çevridi, sadece fetch ile sunucudan veri çektiğinde kullanılır.

      if (!response.ok) {
        // Sunucudan hata mesajı geldiyse göster
        alert("Bilinmeyen bir hata oluştu.");
        return;
      }
      handleMovie(data.reply);
    } catch (err) {
      console.error("İstek hatası:", err);
      alert("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  const handleMovie = async (query: any) => {
    try {
      const parsedQuery = typeof query === "string" ? JSON.parse(query) : query;
      // title'ı almaya çalış
      const title = parsedQuery?.results?.[0]?.title; // ? ara bir değer null olsa bile hata vermesini engeller.

      if (!title || title === "undefined") {
        console.error("Title is invalid");
        alert("Plot is invalid");
        return;
      }

      setAIData(parsedQuery);

      const data = [];

      for (const result of parsedQuery.results) {
        if (!result.title || result.title === "undefined") continue;

        const response = await fetch("http://localhost:3001/api/search-movie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query1: JSON.stringify({ title: result.title }),
          }),
        });

        const item = await response.json();

        // boş veya sonuçsuzsa atla
        if (!item?.results || item.results.length === 0) continue;

        let c = 0;
        for (const res of item.results) {
          if (res.release_date?.slice(0, 4) == result.releaseDate) break;
          c++;
        }
        if (c == item.results.length - 1) {
          c = 0;
        }

        data.push(item.results[c]);
      }
      const filter = data.filter((item) => item !== undefined);
      console.log(filter);

      setApiData(filter);
      handletrailer(filter);
    } catch (err) {
      console.error("İstek hatası:", err);
      alert("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  const handletrailer = async (query: any) => {
    try {
      const parsedQuery = typeof query === "string" ? JSON.parse(query) : query;

      const movie_ids = parsedQuery
        .map((result: any) => result.id)
        .filter(Boolean); // undefined olanları çıkar

      const trailers = await Promise.all(
        movie_ids.map(async (id: string) => {
          try {
            const response = await fetch(
              "http://localhost:3001/api/search-trailer",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query1: JSON.stringify({ id }),
                }),
              }
            );

            const response2 = await response.json();

            if (!response.ok) {
              console.error("Hata:", response.statusText);
              return null; // hatalı olanları atla
            }

            let filtered = response2.results.filter(
              (item: any) =>
                item.type === "Trailer" && item.name.includes("Official")
            );

            if (filtered.length === 0) {
              filtered = response2.results.filter(
                (item: any) => item.type === "Trailer"
              );
            }

            if (filtered.length === 0) {
              return null; // hiç trailer yoksa
            }

            return `https://www.youtube.com/watch?v=${filtered[0].key}`;
          } catch (e) {
            console.error("Trailer fetch hatası:", e);
            return null;
          }
        })
      );

      const validTrailers = trailers.filter(Boolean); // null olanları çıkar

      setApiData2(validTrailers);
    } catch (err) {
      console.error("İstek hatası:", err);
      alert("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <>
      <TopBar onSearch={handleSearch} />
      <Section
        id="container"
        info={apiData}
        aIinfo={aIData}
        trailer={apiData2}
      />
      <Footer />
    </>
  );
}

export default App;
