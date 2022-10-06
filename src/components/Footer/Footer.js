import React from 'react';

export default function Footer() {
  return (
    <footer className='footer'>
      <h3 className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className='footer__links'>
        <p className='footer__copyright'>© 2022</p>
        <div className='footer__links-container'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/PavlovAles/' target='_blank' rel='noreferrer'>Github</a>
        </div>
      </div>
    </footer>
  )
}
