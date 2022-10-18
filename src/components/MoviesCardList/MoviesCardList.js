import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, favorite, onLikeClick }) {
  return (
    <ul className='card-list'>
      {movies.map(movie => (
        <li key={movie.movieId}>
          <MoviesCard movie={movie} favorite={favorite} onLikeClick={onLikeClick} />
        </li>
      ))}
    </ul>
  )
}
