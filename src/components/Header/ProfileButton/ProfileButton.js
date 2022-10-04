import React from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../../../images/profile-icon.svg';
import styles from './ProfileButton.module.css';

export default function ProfileButton() {
  return (
    <Link className={styles.profileButton} to='/profile'>
      <img src={profileIcon} className={styles.profileButton__icon} alt='Иконка профиля' />
      Аккаунт
    </Link>
  )
}
