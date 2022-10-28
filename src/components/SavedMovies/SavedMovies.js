import React, { useEffect, useRef, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NoResultsOrError from '../NoResultsOrError/NoResultsOrError';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ movies, status, filter, filterFunction, onSearch, onLikeClick }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const prevFilter = useRef();

  useEffect(() => {
    const newFilteredMovies = filterFunction();
    setFilteredMovies(newFilteredMovies);
    prevFilter.current = filter;
  }, [movies, filter, filterFunction]);

  return (
    <section className='saved-movies'>
      <SearchForm onSearch={onSearch} />
      {status === 'loading' && <Preloader />}
      {status !== 'loading' &&
        <>
          {filteredMovies.length ?
            <MoviesCardList
              movies={filteredMovies}
              favorite={true}
              onLikeClick={onLikeClick}
            /> :
            (filter.query || status === 'error') && <NoResultsOrError error={status === 'error'} />
          }
        </>
      }
    </section>
  )
}
