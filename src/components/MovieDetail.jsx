import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=3e048f30`);
    const data = await response.json();

    setMovie(data);
  };

  if (!movie) return null;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
    </div>
  );
}

export default MovieDetail;
