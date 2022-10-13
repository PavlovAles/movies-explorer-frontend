import React, { useState } from 'react';
import MoreButton from './MoreButton/MoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import NoResults from './NoResults/NoResults';

export default function Movies({ cards, status }) {
  const [cardsAmount, setCardsAmount] = useState(3);

  return (
    <section className='movies'>
      <SearchForm />
      {status === 'loading' && <Preloader />}
      {status === 'success' &&
        <>
          {cards.length ?
            <MoviesCardList cards={cards} favorite={false} /> :
            <NoResults />
          }
          {(cardsAmount === cards.length) && <MoreButton />}
        </>
      }
    </section>
  )
}
