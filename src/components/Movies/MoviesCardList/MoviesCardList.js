import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {
  const cards = [
    { id: 65432, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65433, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65434, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65435, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65436, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65437, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65438, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65439, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65430, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
  ]
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
