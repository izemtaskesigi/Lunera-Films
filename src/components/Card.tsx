interface props {
  title: string;
  overview: string;
  releaseDate: string;
  imageUrl: string;
  imdb: number;
  summary: string;
  genre: string;
  platforms: string;
  id: string;
  link: string;
  cast: string;
}
import "./css/Card.css";
function card({
  title,
  overview,
  releaseDate,
  imageUrl,
  imdb,
  summary,
  genre,
  platforms,
  id,
  link,
  cast,
}: props) {
  return (
    <div className="card" id={id}>
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
          {summary}
        </p>
        <p className="info">
          <b>platforms: </b>
          {platforms}
        </p>
        <p className="info">
          <b>Cast: </b>
          {cast}
        </p>
        <p className="info">
          <b>Fragman linki: </b>
          <a href={link} target="_blank">
            {link}
          </a>
        </p>
      </div>
    </div>
  );
}

export default card;
