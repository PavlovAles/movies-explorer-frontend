import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className='notfound'>
      <p className='notfound__code'>404</p>
      <p className='notfound__text'>Страница не найдена</p>
      <Link to='/' className='notfound__link'>Назад</Link>
    </section>
  )
}
