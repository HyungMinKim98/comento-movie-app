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
    <ul>
      {movies.map(movie => (
        <li key={movie.imdbID}>
          <Link to={`/movie/${movie.imdbID}`}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
