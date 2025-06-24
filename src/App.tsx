import TopBar from "./components/TopBar";
import Section from "./components/Section.tsx";
import Footer from "./components/Footer.tsx";

const scroll = (element: string) => {
  const el = document.getElementById(element);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

function App() {
  return (
    <>
      <TopBar
        scroll={() => {
          scroll("top");
        }}
      />
      <Section />
      <Footer />
      <TopBar id="top" />
    </>
  );
}

export default App;
