import "./TopBar.css";
import Button1 from "./Button1";
interface props {
  scroll?: () => void;
  id?: string;
}
function TopBar({ scroll, id }: props) {
  return (
    <header id={id}>
      <h1>✨ Aura'ya Hoş Geldin!</h1>
      <p>PDF'lerini yükle, AI destekli özetler ve sınavlar hazırlansın!</p>
      <Button1 name="Hemen Başla" id="start-btn" onClick={() => scroll} />
    </header>
  );
}
export default TopBar;
