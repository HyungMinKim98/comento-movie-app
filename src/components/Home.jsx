import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [query, page]);

const fetchMovies = async () => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    setMovies([]);
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    fetchMovies();
  }
}
  return (
    <div>
    <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={handleKeyPress} />
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Load more</button>
      {movies.map(movie => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
