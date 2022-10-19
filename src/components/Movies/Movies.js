import React, { useState } from 'react';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import NoResultsOrError from '../NoResultsOrError/NoResultsOrError';
import './Movies.css';

export default function Movies({ movies, status, onSearch, onLikeClick }) {
  const [cardsAmount, setCardsAmount] = useState(3);

  function showMoreCards() {
    setCardsAmount(Math.min(cardsAmount + 3, movies.length));
  }

  return (
    <section className='movies'>
      <SearchForm onSearch={onSearch} />
      {status === 'loading' && <Preloader />}
      {status !== 'loading' &&
        <>
          {movies.length ?
            <MoviesCardList movies={movies} favorite={false} onLikeClick={onLikeClick} /> :
            <NoResultsOrError error={status === 'error'} />
          }
          {(cardsAmount !== movies.length) && <MoreButton onClick={showMoreCards} />}
        </>
      }
    </section>
  )
}
