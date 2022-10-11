import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Burger from './Burger/Burger';
import ProfileButton from '../ProfileButton/ProfileButton';
import './AuthorizedNavigation.css';


export default function AuthorizedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  function handleRedirect() {
    setIsOpen(false);
  }

  return (
    <>
      <Burger clicked={isOpen} handleClick={() => setIsOpen(!isOpen)} />
      <nav className={`authorized-navigation ${isOpen ? 'authorized-navigation_opened' : ''}`}>
        <ul className='authorized-navigation__list'>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/' ? 'authorized-navigation__link_active' : ''}`}
              to='/'
              onClick={handleRedirect}
            >
              Главная
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/movies' ? 'authorized-navigation__link_active' : ''}`}
              to='/movies'
              onClick={handleRedirect}
            >
              Фильмы
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/saved-movies' ? 'authorized-navigation__link_active' : ''}`}
              to='/saved-movies'
              onClick={handleRedirect}>
              Сохраненные фильмы
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <ProfileButton onClick={handleRedirect} />
          </li>
        </ul>
      </nav>
    </>
  )
}
