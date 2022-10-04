import React from 'react';
import styles from './Burger.module.css';

export default function Burger({ clicked, handleClick }) {
  return (
    <div className={`${styles.burger} ${clicked ? styles.burger_cross : ''}`} onClick={() => handleClick()}>
      <div className={styles.burger__dash}></div>
      <div className={styles.burger__dash}></div>
      <div className={styles.burger__dash}></div>
    </div>
  )
}
