import Card from "./Card.tsx";
import "./css/Section.css";
interface props {
  id: string;
  query: string;
}
function Section({ id, query }: props) {
  const querys = query;
  const data = {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal record.",
    release_date: "2010-07-16",
    poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    vote_average: 8.8,
    suggestion: "really good",
  };
  return (
    <>
      <section className="examples" id={id}>
        <div className="cards">
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg"
            imdb={data.vote_average}
            suggestion={data.suggestion}
          />
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg"
            imdb={data.vote_average}
            suggestion={data.suggestion}
          />
          <Card
            title={data.title}
            overview={data.overview}
            releaseDate={data.release_date}
            imageUrl="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg"
            imdb={data.vote_average}
            suggestion={data.suggestion}
          />
        </div>
      </section>
    </>
  );
}

export default Section;
