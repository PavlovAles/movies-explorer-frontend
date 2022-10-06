import React from 'react'

export default function Toggle({ on, clickHandler }) {
  return (
    <button
      type='button'
      className={`toggle ${on ? 'toogle_on' : ''}`}
      onClick={() => clickHandler()}
    >
      <div className='toggle__toggle'>
        <div className='toggle__circle'></div>
      </div>
      <p className='toggle__text'>Короткометражки</p>
    </button>
  )
}
