import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ cards, favorite }) {
  return (
    <ul className='card-list'>
      {cards.map(card => (
        <li key={card.id}>
          <MoviesCard card={card} favorite={favorite} />
        </li>
      ))}
    </ul>
  )
}
