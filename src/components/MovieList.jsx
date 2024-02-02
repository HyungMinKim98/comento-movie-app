import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("https://www.omdbapi.com/?s=Batman&apikey=3e048f30");
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div>
      {movies.map(movie => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
