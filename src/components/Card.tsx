interface props {
  title: string;
  overview: string;
  releaseDate: string;
  imageUrl: string;
  imdb: number;
  suggestion: string;
}
import "./css/Card.css";
function card({
  title,
  overview,
  releaseDate,
  imageUrl,
  imdb,
  suggestion,
}: props) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} />
      <p className="imdb">IMDb: {imdb}</p>
      <p className="info">Release Date: {releaseDate}</p>
      <p className="info">{overview}</p>
      <p className="info">{suggestion}</p>
    </div>
  );
}

export default card;
