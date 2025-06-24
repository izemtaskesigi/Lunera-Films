interface props {
  header: string;
  paragraph: string;
}
import "./Card.css";
function card({ header, paragraph }: props) {
  return (
    <div className="card">
      <h3>{header}</h3>
      <p>{paragraph}</p>
    </div>
  );
}

export default card;
