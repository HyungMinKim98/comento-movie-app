import React, { useEffect, useState } from "react";

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [query]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
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
      {movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <img src={movie.poster} alt={movie.title} />
        </div>
      ))}
    </div>
  );
}

export default SearchMovies;
