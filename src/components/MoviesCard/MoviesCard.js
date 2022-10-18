import React, { useState } from 'react';
import formatDuration from '../../utils/formatDuration';
import './MoviesCard.css';

export default function MoviesCard({ movie, favorite, onLikeClick }) {
  const [liked, setLiked] = useState(movie.favorite);

  function handleLikeClick() {
    setLiked(!liked);
    onLikeClick(movie);
  }

  return (
    <article className='card'>
      <a className='card__trailerlink' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='card__image' src={movie.image} alt={movie.caption} />
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
              onClick={handleLikeClick}
            ></button> :
            <button
              className={`card__button card__button_like ${liked ? 'card__button_like-active' : ''}`}
              type='button'
              onClick={handleLikeClick}
            ></button>
        }
      </div>
    </article >
  )
}
