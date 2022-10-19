import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ movies, status, onSearch, onLikeClick }) {
  return (
    <section className='saved-movies'>
      <SearchForm onSearch={onSearch} />
      {
        status === 'loading' ?
          <Preloader /> :
          <MoviesCardList movies={movies} favorite={true} onLikeClick={onLikeClick} />
      }
    </section>
  )
}
