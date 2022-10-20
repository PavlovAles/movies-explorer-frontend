import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NoResultsOrError from '../NoResultsOrError/NoResultsOrError';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ movies, status, onSearch, onLikeClick, clearFiler }) {
  return (
    <section className='saved-movies'>
      <SearchForm onSearch={onSearch} clearFiler={clearFiler} />
      {status === 'loading' && <Preloader />}
      {status !== 'loading' &&
        <>
          {movies.length ?
            <MoviesCardList movies={movies} favorite={true} onLikeClick={onLikeClick} /> :
            <NoResultsOrError error={status === 'error'} />
          }
        </>
      }
    </section>
  )
}
