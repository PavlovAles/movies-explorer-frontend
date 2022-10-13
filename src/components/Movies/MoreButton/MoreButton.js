import React from 'react';
import './MoreButton.css';

export default function MoreButton({ onClick }) {
  return (
    <button
      className='more-button'
      type='button'
      onClick={() => onClick()}
    >
      Ещё
    </button>
  )
}
