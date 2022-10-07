import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ cards }) {
  return (
    <ul className='card-list'>
      {cards.map(card => (
        <li>
          <MoviesCard card={card} key={card.id} />
        </li>
      ))}
    </ul>
  )
}
