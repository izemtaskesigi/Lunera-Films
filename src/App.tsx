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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    showContainer();
    console.log(query);
  };
  return (
    <>
      <TopBar onSearch={handleSearch} />
      <Section id="container" query={searchQuery} />
      <Footer />
    </>
  );
}

export default App;
