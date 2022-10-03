import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.footer__heading}>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className={styles.footer__links}>
        <p className={styles.footer__copyright}>© 2020</p>
        <div className={styles['footer__links-container']}>
          <a className={styles.footer__link} href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          <a className={styles.footer__link} href='https://github.com/PavlovAles/' target='_blank' rel='noreferrer'>Github</a>
        </div>
      </div>
    </footer>
  )
}
