import React, { useState } from 'react'
import searchIcon from '../../../images/search-icon.svg'
import Toggle from './Toggle/Toggle';

export default function SearchForm() {
  const [movie, setMovie] = useState('');
  const [shorts, setShorts] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <img src={searchIcon} alt='Иконка поиска' className='search__icon' />
        <input
          type='text'
          placeholder='Фильм'
          id='movie'
          name='movie'
          minLength={1}
          maxLength={200}
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          className='search__input'
        />
        <button
          className='search__submit'
          type='submit'
        >
        </button>
        <div className='search__divider'></div>
        <Toggle on={shorts} clickHandler={() => setShorts(!shorts)}/>
      </form>
    </section>
  )
}
