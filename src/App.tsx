import TopBar from "./components/TopBar";
import Section from "./components/Section.tsx";
import Footer from "./components/Footer.tsx";
import { useState } from "react";

const showContainer = () => {
  const section = document.getElementById("container");
  console.log("girdi");
  if (section) {
    section.style.display = "block";
    setTimeout(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }
};
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState<any>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    showContainer();
    console.log(query);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${query}`
      );

      if (!response.ok) throw new Error("API isteği başarısız");

      const data = await response.json();
      console.log("API cevabı:", data);
      setApiData(data);
    } catch (error) {
      console.error("API isteği hatası:", error);
    }
  };
  return (
    <>
      <TopBar onSearch={handleSearch} />
      <Section id="container" info={apiData} />
      <Footer />
    </>
  );
}

export default App;
