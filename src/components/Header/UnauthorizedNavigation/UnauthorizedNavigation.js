import React from 'react';
import { Link } from 'react-router-dom';
import './UnauthorizedNavigation.css';

export default function UnauthorizedNavigation() {
  return (
    <nav className='unauthorized-navigation'>
      <ul className='unauthorized-navigation__list'>
        <li>
          <Link className='unauthorized-navigation__signup' to='/signup'>
            Регистрация
          </Link>
        </li>
        <li>
          <Link className='unauthorized-navigation__signin' to='/signin'>
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  )
}
