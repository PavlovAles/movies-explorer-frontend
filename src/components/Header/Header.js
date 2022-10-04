import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from './Navigation/Navigation';
import ProfileButton from './ProfileButton/ProfileButton';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function Header({ authorized }) {
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();

  const headerStyle = {
    backgroundColor: (pathname === '/') ? '#073042' : '#fff',
  }

  return (
    <header className='header' style={headerStyle}>
      <div className='header__wrapper'>
        <Link to='/'>
          <img src={logo} className='header__logo' alt='Логотип' />
        </Link>
        <Navigation authorized={authorized} />
        {authorized && windowWidth > 768 && <ProfileButton />}
      </div>
    </header>
  )
}
