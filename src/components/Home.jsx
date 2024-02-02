import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch recommended movies once at the start
  useEffect(() => {
    fetchRecommendedMovies();
  }, []);

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [query, page]);

  const fetchRecommendedMovies = async () => {
    try {
      // Replace with actual API call for recommended movies
      const response = await fetch(`http://www.omdbapi.com/?s=Batman&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        setRecommendedMovies(data.Search);
      } else {
        setRecommendedMovies([]);
      }
    } catch (error) {
      console.error('Failed to fetch recommended movies:', error);
      setRecommendedMovies([]);
    }
  };

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
      <button onClick={() => {/* 로그인 처리를 해주는 함수를 여기에 넣으세요. */}}>Log in</button>
      <h1>Recommended Movies</h1>
      <div className="container">
        {recommendedMovies.map(movie => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-item">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
          </Link>
        ))}
      </div>
      <h1>Search Results</h1>
      <div className="container">
        {movies.map(movie => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-item">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
          </Link>
        ))}
      </div>
    </div>
  );
  
}

export default Home;
