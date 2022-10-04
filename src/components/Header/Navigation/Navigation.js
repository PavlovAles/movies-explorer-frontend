import React from 'react'
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import Burger from './Burger/Burger';
import styles from './Navigation.module.css';

export default function Navigation({ authorized }) {
  return (
    <>
      {/* <Burger /> */}
      {!authorized && <nav>
        <ul className={styles['navigation__list-unauthorized']}>
          <li>
            <Link className={styles.navigation__signup} to='/signup'>
              Регистрация
            </Link>
          </li>
          <li>
            <Link className={styles.navigation__signin} to='/signup'>
              Вход
            </Link>
          </li>
        </ul>
      </nav>}
      {authorized && <nav className={styles['navigation__nav-authorized']}>
        <ul className={styles['navigation__list-authorized']}>
          {/* <li>
            <Link className={styles.navigation__link} to='/'>
              Главная
            </Link>
          </li> */}
          <li>
            <Link className={styles.navigation__movies} to='/movies'>
              Фильмы
            </Link>
          </li>
          <li>
            <Link className={styles['navigation__saved-movies']} to='/saved-movies'>
              Сохраненные фильмы
            </Link>
          </li>
          {/* <li>
            <ProfileButton />  
          </li> */}
        </ul>
      </nav>}
    </>
  )
}
