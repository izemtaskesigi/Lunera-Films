import Button1 from "./Button1";
import "./css/SearchBar.css";
import { useState } from "react";
interface props {
  search: (query: string) => void;
}
function SearchBar({ search }: props) {
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    console.log("Inputtan gelen veri:", inputValue); // Konsola yaz
    search(inputValue); // Dışarıdan bir search fonksiyonu tanımlandıysa çağır
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="kavuşamayan aşıklar"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button1 name="Ara" id={"search-btn"} onClick={handleClick} />
    </div>
  );
}

export default SearchBar;
