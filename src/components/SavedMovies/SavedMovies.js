import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ cards, status }) {
  return (
    <section className='saved-movies'>
      {
        status === 'loading' ?
          <Preloader /> :
          <MoviesCardList cards={cards} favorite={true} />
      }
    </section>
  )
}
