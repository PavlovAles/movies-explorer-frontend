import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li>
          <a className='portfolio__project' href='https://github.com/PavlovAles/react-mesto-api-full' target='_blank' rel='noreferrer'>
            Одностраничное приложение
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li>
          <a className='portfolio__project' href='https://github.com/PavlovAles/weather-forecast' target='_blank' rel='noreferrer'>
            Прогноз погоды
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li>
          <a className='portfolio__project' href='https://github.com/PavlovAles/lad_testTask' target='_blank' rel='noreferrer'>
            Игра «Боевой маг»
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li>
          <a className='portfolio__project' href='https://github.com/untitled-dream/lubimovka/tree/react' target='_blank' rel='noreferrer'>
            Групповой проект "Любимовка"
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
