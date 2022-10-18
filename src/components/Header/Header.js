import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import ProfileButton from './ProfileButton/ProfileButton';
import useWindowWidth from '../../hooks/useWindowWidth';
import AuthorizedNavigation from './AuthorizedNavigation/AuthorizedNavigation';
import UnauthorizedNavigation from './UnauthorizedNavigation/UnauthorizedNavigation';
import './Header.css';

export default function Header({ authorized, onLinkClick }) {
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();

  const homepage = (pathname === '/') ? true : false;

  return (
    <header className={`header ${homepage ? 'header_home' : ''}`}>
      <div className='header__wrapper'>
        <Link to='/' onClick={() => onLinkClick()}>
          <img src={logo} className='header__logo' alt='Логотип' />
        </Link>
        {
          authorized ?
            <>
              <AuthorizedNavigation onLinkClick={onLinkClick} />
              {windowWidth > 768 && <ProfileButton />}
            </> :
            <UnauthorizedNavigation />
        }
      </div>
    </header>
  )
}
