import React from 'react'

export default function MoviesCard({ card, like }) {
  return (
    <article className='card'>
      <img className='card__image' src={card.url} alt={card.caption}/>
      <div className='card__caption'>
        <h4 className='card__title'>
          {card.name}
          <p className='card__duration'>{card.duration}</p>
        </h4>
        <button className='card__like'></button>
      </div>
    </article>
  )
}
