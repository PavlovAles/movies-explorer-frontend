import React, { useEffect, useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import searchIcon from '../../images/search-icon.svg';
import Toggle from './Toggle/Toggle';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const [shorts, setShorts] = useState(false);
  
  const width = useWindowWidth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('filter')) {
      const { query, shorts } = JSON.parse(localStorage.getItem('filter'));
      setQuery(query);
      setShorts(shorts);
      onSearch({ query, shorts });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ query: query, shorts });
  }

  function handleToggle() {
    setShorts(!shorts);
    onSearch({ query: query, shorts: !shorts });
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <img src={searchIcon} alt='Иконка поиска' className='search__icon' />
        <input
          type='text'
          placeholder='Фильм'
          id='query'
          name='query'
          minLength={1}
          maxLength={200}
          autoComplete='off'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
      {width <= 650 && <Toggle on={shorts} clickHandler={handleToggle} />}
    </section>
  )
}
