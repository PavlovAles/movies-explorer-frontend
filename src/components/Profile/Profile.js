import React from 'react'
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { isAnythingChanged, isRequired, isValidEmail } from '../../utils/validation';
import './Profile.css';

export default function Profile({ user, onSubmit, onLogout }) {

  const { values, isValid, setValid, errors, touched, changeHandler } = useForm(
    { name: user.name, email: user.email },
    [
      ({ name }) => isRequired(name) || { name: 'Имя - обязательное поле' },
      ({ email }) => isValidEmail(email) || { email: 'Невалидный E-mail' },
      ({ email }) => isRequired(email) || { email: 'E-mail - обязательное поле' },
      (values) => isAnythingChanged(values , user) || { values: '' },
    ],
  );

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: values.name, email: values.email });
    setValid(false);
  }

  return (
    <section className='profile'>
      <div className='profile__wrapper'>
        <form className='profile__form' name='profile' onSubmit={handleSubmit} noValidate>
          <h2 className='profile__title'>{`Привет, ${user.name}!`}</h2>
          <fieldset className='profile__fieldset'>
            <label
              htmlFor="name"
              className="profile__label">
              Имя
              <input
                type='text'
                id='name'
                name='name'
                minLength={1}
                maxLength={200}
                required
                autoComplete='off'
                className='profile__input'
                onChange={changeHandler}
                value={values.name}
              />
              {touched.name && errors.name && <p className='profile__error'>{errors.name}</p>}
            </label>
            <div className='profile__divider'></div>
            <label
              htmlFor="email"
              className="profile__label">
              Email
              <input
                type='email'
                id='email'
                name='email'
                minLength={6}
                maxLength={200}
                required
                autoComplete='off'
                className='profile__input'
                onChange={changeHandler}
                value={values.email}
              />
              {touched.email && errors.email && <p className='profile__error'>{errors.email}</p>}
            </label>
          </fieldset>
          <button
            className='profile__submit'
            type='submit'
            onSubmit={handleSubmit}
            disabled={!isValid}
          >
            Редактировать
          </button>
          <Link to='/' className='profile__signput' onClick={() => onLogout()}>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  )
}
