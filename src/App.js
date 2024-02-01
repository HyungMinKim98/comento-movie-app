import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchMovies from './components/SearchMovies';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
