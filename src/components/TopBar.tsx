import "./css/TopBar.css";
import SearchBar from "./SearchBar";

interface props {
  onSearch: (query: string) => void;
  id?: string;
}
function TopBar({ onSearch, id }: props) {
  return (
    <header id={id}>
      <h1>🎬 Lunara Films'e Hoşgeldin!</h1>
      <p>Bir konu yaz, sana uygun filmleri bulalım!</p>
      <SearchBar search={onSearch}></SearchBar>
    </header>
  );
}
export default TopBar;
