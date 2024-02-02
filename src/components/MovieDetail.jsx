import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />

      <p>감독: {movie.Director}</p>
      <p>출연: {movie.Actors}</p>
      <p>개봉일: {movie.Released}</p>
      <p>줄거리: {movie.Plot}</p>
      {movie.filmography && movie.filmography.length > 0 && <p>필모그래피: {movie.filmography.map((film, index) => <p key={index}>{film.titleId}</p>)}</p>}
      {movie.knownFor && movie.knownFor.length > 0 && <p>알려진 작품: {movie.knownFor.map((film, index) => <p key={index}>{film.titleId}</p>)}</p>}
      {movie.awards && movie.awards.length > 0 && <p>상: {movie.awards.map((award, index) => <p key={index}>{award.awardName} - {award.year} - {award.winner ? '수상' : '미수상'}</p>)}</p>}
    
      {/* 추가 정보를 보여주는 섹션 */}
    </div>
  );
}

export default MovieDetail;
