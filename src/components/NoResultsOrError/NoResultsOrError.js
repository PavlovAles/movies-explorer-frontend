import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import errorIcon from '../../images/error-icon.svg';
import './NoResultsOrError.css';

export default function NoResultsOrError({ error }) {
  return (
    <div className='no-results'>
      <img src={error ? errorIcon : searchIcon} alt='Иконка' className='no-results__image' />
      <p className='no-results__text'>
        {error ?
          `Во время запроса произошла ошибка.\n
           Возможно, проблема с соединением или сервер недоступен.\n
           Подождите немного и попробуйте ещё раз` :
          'По вашему запросу ничего не найдено'}
      </p>
    </div>
  )
}
