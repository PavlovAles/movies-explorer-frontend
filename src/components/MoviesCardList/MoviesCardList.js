import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, favorite }) {
  return (
    <ul className='card-list'>
      {movies.map(movie => (
        <li key={movie.id}>
          <MoviesCard movie={movie} favorite={favorite} />
        </li>
      ))}
    </ul>
  )
}
