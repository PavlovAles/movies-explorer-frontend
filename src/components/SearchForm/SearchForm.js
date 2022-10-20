import React, { useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import searchIcon from '../../images/search-icon.svg';
import Toggle from './Toggle/Toggle';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm({ onSearch, onToggleClick }) {
  const [movie, setMovie] = useState('');
  const [shorts, setShorts] = useState(false);
  const width = useWindowWidth();
  const { pathname } = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (pathname === '/saved-movies' || movie.length) {
      onSearch(movie);
    }
  }

  function handleToggle() {
    setShorts(!shorts);
    onToggleClick();
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
          autoComplete='off'
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
        {width > 650 && <Toggle on={shorts} clickHandler={handleToggle} />}
      </form>
      {width < 650 && <Toggle on={shorts} clickHandler={handleToggle} />}
    </section>
  )
}
