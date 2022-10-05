import React from 'react'

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li>
          <a className='portfolio__project'>
            Статичный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li>
          <a className='portfolio__project'>
            Адаптивный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li>
          <a className='portfolio__project'>
            Одностраничное приложение
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
