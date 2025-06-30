import Card from "./Card.tsx";
import "./css/Section.css";
interface props {
  id: string;
  info?: any | null;
  aIinfo?: any | null;
  trailer?: any | null;
}

function Section({ id, info, aIinfo, trailer }: props) {
  if (!info || !trailer) {
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
  // map react elemanlarından oluşan bir dizi returnler cardsın içine
  const cards = info.map((result: any, index: number) => {
    const movie = result;
    const genreNames = movie.genre_ids
      .map((id: number) => genreMap[id])
      .filter(Boolean);

    const data = {
      title: movie.original_title,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: Number(movie.vote_average.toFixed(1)),
      release_date: movie.release_date?.slice(0, 4),
      summary: aIinfo.results[index]?.summary || "No summary",
      genre: genreNames.join(", "),
      platforms: aIinfo.results[index]?.platforms || [],
      link: trailer[index] || "no trailers :(",
      cast: aIinfo.results[index]?.cast,
    };

    return (
      <Card
        key={data.title + index}
        id={data.title}
        title={data.title}
        overview={data.overview}
        releaseDate={data.release_date}
        imageUrl={data.poster_path}
        imdb={data.vote_average}
        summary={data.summary}
        genre={data.genre}
        platforms={data.platforms}
        link={data.link}
        cast={data.cast}
      />
    );
  });

  return (
    <>
      <section className="examples" id={id}>
        <div className="cards" id="container">
          {cards}
        </div>
      </section>
    </>
  );
}

export default Section;
