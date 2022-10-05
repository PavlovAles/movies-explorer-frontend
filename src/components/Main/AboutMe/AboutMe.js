import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import photoPath from '../../../images/my-photo.png'

export default function AboutMe() {
  return (
    <section className='student'>
      <SectionTitle title='Студент' />
      <article className='student__article'>
        <div className='student__text-wrapper'>
          <h3 className='student__name'>Алесь</h3>
          <p className='student__summary'>Фронтенд-разработчик, 30 лет</p>
          <p className='student__text'>
            Люблю решать технические задачи и видеть результат своей работы.
            Долгое время проектировал и тестировал системы управления, а с особой любовью — пользовательские интерфейсы операторов.
            Теперь зачарован фронтендом и современными технологиями.
          </p>
          <a className='student__gh' href='https://github.com/PavlovAles' target='_blank' rel='noreferrer'>Github</a>
        </div>
        <img src={photoPath} className='student__photo' alt='мое фото' />
      </article>
    </section>
  )
}
