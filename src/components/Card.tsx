interface props {
  title: string;
  overview: string;
  releaseDate: string;
  imageUrl: string;
  imdb: number;
  suggestion: string;
  genre: string;
}
import "./css/Card.css";
function card({
  title,
  overview,
  releaseDate,
  imageUrl,
  imdb,
  suggestion,
  genre,
}: props) {
  return (
    <div className="card">
      <div className="card-content">
        <img src={imageUrl} alt={title} />
        <p className="imdb">
          <b>IMDb:</b> {imdb}
        </p>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="info">
          <b>Genres: </b>
          {genre}
        </p>
        <p className="info">
          <b>Date: </b>
          {releaseDate}
        </p>
        <p className="info">
          <b>Overview: </b>
          {overview}
        </p>
        <p className="info">
          <b>Corelation: </b>
          {suggestion}
        </p>
      </div>
    </div>
  );
}

export default card;
