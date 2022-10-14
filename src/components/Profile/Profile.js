import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Profile.css'

export default function Profile({ user, onSubmit, onLogout }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editPermission, setEditPermission] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
    setEditPermission(e.target.value !== user.name || e.target.value !== user.email);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEditPermission(e.target.value !== user.name || e.target.value !== user.email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({name, email});
    setEditPermission(false);
  }

  return (
    <section className='profile'>
      <div className='profile__wrapper'>
        <form className='profile__form' name='profile' onSubmit={handleSubmit}>
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
                onChange={handleNameChange}
                value={name}
              />
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
                onChange={handleEmailChange}
                value={email}
              />
            </label>
          </fieldset>
          <button
            className={`profile__submit ${editPermission ? '' : 'profile__submit_disabled'}`}
            type='submit'
            onSubmit={handleSubmit}
            disabled={!editPermission}
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
