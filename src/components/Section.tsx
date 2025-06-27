import Card from "./Card.tsx";
import "./css/Section.css";
interface props {
  id: string;
  info?: any | null;
  suggest?: any | null;
}

function Section({ id, info, suggest }: props) {
  if (!info) {
    return;
  }
  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  const genreNames = info.genre_ids
    .map((id: number) => genreMap[id])
    .filter(Boolean);

  const data = {
    title: info.original_title,
    overview: info.overview,
    poster_path: `https://image.tmdb.org/t/p/w500${info.poster_path}`,
    vote_average: Number(info.vote_average.toFixed(2)),
    release_date: info.release_date.slice(0, 4),
    suggestion: suggest,
    genre: genreNames.join(",  "),
  };
  return (
    <>
      <section className="examples" id={id}>
        <div className="cards">
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl={data.poster_path}
            imdb={data.vote_average}
            suggestion={data.suggestion}
            genre={data.genre}
          />
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl={data.poster_path}
            imdb={data.vote_average}
            suggestion={data.suggestion}
            genre={data.genre}
          />
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl={data.poster_path}
            imdb={data.vote_average}
            suggestion={data.suggestion}
            genre={data.genre}
          />
        </div>
      </section>
    </>
  );
}

export default Section;
