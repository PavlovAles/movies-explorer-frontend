import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from './Navigation/Navigation';
import styles from './Header.module.css';
import ProfileButton from './ProfileButton/ProfileButton';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function Header({ authorized }) {
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();

  const headerStyle = {
    backgroundColor: (pathname === '/') ? '#073042' : '#fff',
  }

  return (
    <header className={styles.header} style={headerStyle}>
      <div className={styles.header__wrapper}>
        <Link to='/'>
          <img src={logo} className={styles.header__logo} alt='Логотип' />
        </Link>
        <Navigation authorized={authorized} />
        {authorized && windowWidth > 768 && <ProfileButton />}
      </div>
    </header>
  )
}
