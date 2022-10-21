import React, { useEffect, useRef, useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import NoResultsOrError from '../NoResultsOrError/NoResultsOrError';
import './Movies.css';

export default function Movies({ movies, status, filter, filterFunction, onSearch, onLikeClick }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [cardsAmount, setCardsAmount] = useState(0);
  const [cardsToAdd, setCardsToAdd] = useState(0);
  const windowWidth = useWindowWidth();
  const prevFilter = useRef();

  useEffect(() => {
    const newFilteredMovies = filterFunction();
    setFilteredMovies(newFilteredMovies);

    setCardsToAdd(windowWidth >= 1018 ? 3 : 2);
    const initialAmount = windowWidth >= 1018 ? 12 : windowWidth > 587 ? 8 : 5;
    if (filter !== prevFilter.current) {
      setCardsAmount(Math.min(initialAmount, newFilteredMovies.length));
    }

    prevFilter.current = filter;
  }, [movies, filter, filterFunction, windowWidth]);

  function showMoreCards() {
    setCardsAmount(Math.min(cardsAmount + cardsToAdd, movies.length));
  }

  return (
    <section className='movies'>
      <SearchForm onSearch={onSearch} />
      {status === 'loading' && <Preloader />}
      {status !== 'loading' &&
        <>
          {filteredMovies.length ?
            <MoviesCardList
              movies={filteredMovies.slice(0, cardsAmount)}
              favorite={false}
              onLikeClick={onLikeClick}
            /> :
            (filter.query || status === 'error') && <NoResultsOrError error={status === 'error'} />
          }
          {(cardsAmount < filteredMovies.length) && <MoreButton onClick={showMoreCards} />}
        </>
      }
    </section>
  )
}
