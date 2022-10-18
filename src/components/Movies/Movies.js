import React, { useState } from 'react';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import NoResults from './NoResults/NoResults';

export default function Movies({ movies, status, onSearch, onLikeClick }) {
  const [cardsAmount, setCardsAmount] = useState(3);

  function showMoreCards() {
    setCardsAmount(Math.min(cardsAmount + 3, movies.length));
  }

  return (
    <section className='movies'>
      <SearchForm onSearch={onSearch} />
      {status === 'loading' && <Preloader />}
      {status === 'success' &&
        <>
          {movies.length ?
            <MoviesCardList movies={movies} favorite={false} onLikeClick={onLikeClick} /> :
            <NoResults />
          }
          {(cardsAmount !== movies.length) && <MoreButton onClick={showMoreCards} />}
        </>
      }
    </section>
  )
}
