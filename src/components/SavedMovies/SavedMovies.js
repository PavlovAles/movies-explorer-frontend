import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ cards, status }) {
  return (
    <section className='saved-movies'>
      <SearchForm />
      {
        status === 'loading' ?
          <Preloader /> :
          <MoviesCardList cards={cards} favorite={true} />
      }
    </section>
  )
}
