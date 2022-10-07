import React from 'react'
import MoreButton from './MoreButton/MoreButton'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'

export default function Movies() {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList />
      <MoreButton />
    </section>
  )
}
