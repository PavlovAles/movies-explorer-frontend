import React from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../../../images/profile-icon.svg';
import './ProfileButton.css';

export default function ProfileButton({ onClick }) {
  return (
    <Link className='profileButton' to='/profile' onClick={onClick}>
      <img src={profileIcon} className='profileButton__icon' alt='Иконка профиля' />
      Аккаунт
    </Link>
  )
}
