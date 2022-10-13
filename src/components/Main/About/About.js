import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './About.css'

export default function About() {
  return (
    <section className='about'>
      <SectionTitle title='О проекте' />
      <div className='about__articles'>
        <article className='about__article'>
          <h3 className='about__article-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__article-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className='about__article'>
          <h3 className='about__article-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__article-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className='track'>
        <div className='track__item'>
          <p className='track__duration track__duration_green'>1 неделя</p>
          <p className='track__title'>Back-end</p>
        </div>
        <div className='track__item'>
          <p className='track__duration'>4 недели</p>
          <p className='track__title'>Front-end</p>
        </div>
      </div>
    </section>
  )
}
