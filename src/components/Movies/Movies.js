import React, { useEffect, useRef, useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import NoResultsOrError from '../NoResultsOrError/NoResultsOrError';
import './Movies.css';

export default function Movies({ movies, status, onSearch, onLikeClick }) {
  const [cardsAmount, setCardsAmount] = useState(0);
  const [cardsToAdd, setCardsToAdd] = useState(0);
  const windowWidth = useWindowWidth();
  const prevMovies = useRef();

  useEffect(() => {
    setCardsToAdd(windowWidth >= 1018 ? 3 : 2);
    const initialAmount = windowWidth >= 1018 ? 12 : windowWidth > 768 ? 8 : 5;
    if (movies !== prevMovies.current) {
      setCardsAmount(Math.min(initialAmount, movies.length));
    }
    prevMovies.current = movies;
  }, [movies, windowWidth]);

  function showMoreCards() {
    setCardsAmount(Math.min(cardsAmount + cardsToAdd, movies.length));
  }

  return (
    <section className='movies'>
      <SearchForm onSearch={onSearch} />
      {status === 'loading' && <Preloader />}
      {status !== 'loading' &&
        <>
          {movies.length ?
            <MoviesCardList movies={movies.slice(0, cardsAmount)} favorite={false} onLikeClick={onLikeClick} /> :
            <NoResultsOrError error={status === 'error'} />
          }
          {(cardsAmount < movies.length) && <MoreButton onClick={showMoreCards} />}
        </>
      }
    </section>
  )
}
