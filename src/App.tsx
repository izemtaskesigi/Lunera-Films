import TopBar from "./components/TopBar";
import Section from "./components/Section.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState<any>(null);
  const [aIData, setAIData] = useState<any>(null);

  useEffect(() => {
    if (apiData) {
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
  }, [apiData]);

  const handleSearch = async (query: string) => {
    console.log("query is" + query);
    const response = await fetch("http://localhost:3001/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: query,
      }),
    });

    const data = await response.json();
    console.log(data.reply);
    handleMovie(data.reply);
  };

  const handleMovie = async (query: any) => {
    console.log("reply is", query);

    // Eğer query bir string'se parse et
    const parsedQuery = typeof query === "string" ? JSON.parse(query) : query;

    // title'ı almaya çalış
    const title = parsedQuery?.results?.[0]?.title;
    const suggestion = parsedQuery?.results?.[0]?.summary;
    setAIData(suggestion);
    console.log("Title being sent:", title);

    if (!title || title === "undefined") {
      console.error("Title is invalid");
      return;
    }

    const response = await fetch("http://localhost:3001/api/search-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query1: JSON.stringify({ title }) }),
    });

    const data = await response.json();
    const info = data?.results?.[0];
    console.log(info);
    setApiData(info);
  };

  return (
    <>
      <TopBar onSearch={handleSearch} />
      <Section id="container" info={apiData} suggest={aIData} />
      <Footer />
    </>
  );
}

export default App;
