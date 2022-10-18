import React from 'react';
import formatDuration from '../../utils/formatDuration';
import './MoviesCard.css';

export default function MoviesCard({ movie, favorite }) {
  const imgUrl = movie.image.formats.small?.url ?? movie.image.formats.thumbnail.url;
  const imgFullSrc = 'https://api.nomoreparties.co/' + imgUrl;
  return (
    <article className='card'>
      <a className='card__trailerlink' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='card__image' src={imgFullSrc} alt={movie.caption} />
      </a>
      <div className='card__caption'>
        <h4 className='card__title'>
          {movie.nameRU}
          <p className='card__duration'>{formatDuration(movie.duration)}</p>
        </h4>
        {
          favorite ?
            <button
              className='card__button card__button_delete'
              type='button'
            ></button> :
            <button
              className={`card__button card__button_like ${movie.liked ? 'card__button-like-active' : ''}`}
              type='button'
            ></button>
        }
      </div>
    </article >
  )
}
