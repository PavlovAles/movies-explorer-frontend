import React from 'react';

export default function Burger({ clicked, handleClick }) {
  return (
    <div className={`burger ${clicked ? 'burger_cross' : ''}`} onClick={() => handleClick()}>
      <div className='burger__dash'></div>
      <div className='burger__dash'></div>
      <div className='burger__dash'></div>
    </div>
  )
}
