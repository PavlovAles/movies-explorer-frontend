import React from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../../../images/profile-icon.svg';

export default function ProfileButton() {
  return (
    <Link className='profileButton' to='/profile'>
      <img src={profileIcon} className='profileButton__icon' alt='Иконка профиля' />
      Аккаунт
    </Link>
  )
}
