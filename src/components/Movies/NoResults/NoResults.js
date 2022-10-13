import React from 'react';
import searchIcon from '../../../images/search-icon.svg';
import './NoResults.css';

export default function NoResults() {
  return (
    <div className='no-results'>
      <img src={searchIcon} alt='Иконка поиска' className='no-results__image' />
      <p className='no-results__text'>По вашему запросу ничего не найдено</p>
    </div>
  )
}
