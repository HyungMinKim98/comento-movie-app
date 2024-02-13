import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc"); 

  // Fetch recommended movies once at the start
  useEffect(() => {
    fetchRecommendedMovies();
  }, []);

  useEffect(() => {
    if (query) {
      fetchMovies(true);
    }
  }, [query, sort]);

  const fetchRecommendedMovies = async () => {
    try {
      // Replace with actual API call for recommended movies
      const response = await fetch(`http://www.omdbapi.com/?s=Batman&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      const data = await response.json();
      console.log(data);

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

  const fetchMovies = async (reset = false, nextPage = page) => {
    try {
      const allMovies = reset ? [] : [...movies];  // reset이 true이면 allMovies를 빈 배열로 설정합니다.
  
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${nextPage}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        allMovies.push(...data.Search);  // 새로운 영화 데이터를 allMovies에 추가합니다.
      }
  
      const sortedMovies = [...allMovies].sort((a, b) => {
        const yearA = Number(a.Year);
        const yearB = Number(b.Year);
  
        if (sort === "asc") {
          return yearA - yearB;
        } else {
          return yearB - yearA;
        }
      });
  
      setMovies(sortedMovies);  // 정렬된 전체 영화 목록을 상태로 설정합니다.
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setMovies([]);
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchMovies(true);

    }
  }

  const handleLoadMore = (event) => {
    event.preventDefault();
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(false, nextPage);
  }
  

  return (
    <div>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={handleKeyPress} />
      <select value={sort} onChange={e => setSort(e.target.value)}> {/* Add this block for sorting */}
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
      <button onClick={() => {/* 로그인 처리를 해주는를 여기에 넣으세요. */}}>Log in</button>
      <h1>Recommended Movies</h1>
      <div className="container">
        {recommendedMovies.map(movie => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <h3>{movie.Year}</h3>
          </Link>
        ))}
      </div>
      <button type="button" onClick={handleLoadMore}>Load More</button>
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
