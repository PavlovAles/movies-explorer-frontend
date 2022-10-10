import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ card, favorite }) {
  return (
    <article className='card'>
      <img className='card__image' src={card.url} alt={card.caption} />
      <div className='card__caption'>
        <h4 className='card__title'>
          {card.name}
          <p className='card__duration'>{card.duration}</p>
        </h4>
        {
          favorite ?
            <button className='card__button card__button_delete'></button> :
            <button className={`card__button card__button_like ${card.liked ? 'card__button-like-active' : ''}`}></button>
        }
      </div>
    </article>
  )
}
