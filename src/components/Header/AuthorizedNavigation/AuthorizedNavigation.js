import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Burger from './Burger/Burger';
import ProfileButton from '../ProfileButton/ProfileButton';
import './AuthorizedNavigation.css';


export default function AuthorizedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <nav className={`authorized-navigation ${isOpen ? 'authorized-navigation_opened' : ''}`}>
        <div className='authorized-navigation__background' onClick={closeMenu}></div>
        <ul className='authorized-navigation__list'>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/' ? 'authorized-navigation__link_active' : ''}`}
              to='/'
              onClick={closeMenu}
            >
              Главная
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/movies' ? 'authorized-navigation__link_active' : ''}`}
              to='/movies'
              onClick={closeMenu}
            >
              Фильмы
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <Link
              className={`authorized-navigation__link ${pathname === '/saved-movies' ? 'authorized-navigation__link_active' : ''}`}
              to='/saved-movies'
              onClick={closeMenu}>
              Сохраненные фильмы
            </Link>
          </li>
          <li className='authorized-navigation__item'>
            <ProfileButton onClick={closeMenu} />
          </li>
        </ul>
      </nav>
      <Burger clicked={isOpen} handleClick={() => setIsOpen(!isOpen)} />
    </>
  )
}
