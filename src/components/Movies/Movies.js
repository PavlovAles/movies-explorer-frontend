import React from 'react'
import MoreButton from './MoreButton/MoreButton'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import SearchForm from './SearchForm/SearchForm'

export default function Movies({ cards, status }) {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList cards={cards} favorite={false} />
      {
        status === 'loading' ?
          <Preloader /> :
          <MoreButton />
      }
    </section>
  )
}
