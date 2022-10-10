import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../../hooks/useWindowWidth';
import ProfileButton from '../ProfileButton/ProfileButton';
import Burger from './Burger/Burger';
import './Navigation.css';

export default function Navigation({ authorized }) {
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = useWindowWidth();

  function handleRedirect() {
    setIsOpen(false);
  }

  return (
    <>
      {!authorized && <nav>
        <ul className='navigation__list-unauthorized'>
          <li>
            <Link className='navigation__signup' to='/signup'>
              Регистрация
            </Link>
          </li>
          <li>
            <Link className='navigation__signin' to='/signin'>
              Войти
            </Link>
          </li>
        </ul>
      </nav>}
      {authorized && <Burger clicked={isOpen} handleClick={() => setIsOpen(!isOpen)} />}
      {authorized &&
        <nav
          className={`navigation__nav-authorized ${isOpen ? 'navigation__nav-authorized_opened' : ''}`}>
          <ul className='navigation__list-authorized'>
            {windowWidth < 768 &&
              <li>
                <Link className='navigation__link' to='/' onClick={handleRedirect}>
                  Главная
                </Link>
              </li>}
            <li>
              <Link className='navigation__link' to='/movies' onClick={handleRedirect}>
                Фильмы
              </Link>
            </li>
            <li>
              <Link className='navigation__link' to='/saved-movies' onClick={handleRedirect}>
                Сохраненные фильмы
              </Link>
            </li>
            {windowWidth < 768 &&
              <li style={{ marginTop: 'auto' }}>
                <ProfileButton onClick={handleRedirect} />
              </li>}
          </ul>
        </nav>}
    </>
  )
}
