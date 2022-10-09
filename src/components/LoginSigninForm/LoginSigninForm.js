import React, { useState } from 'react'
import './LoginSigninForm.css'

export default function LoginSigninForm({ type, formName, title, submitText, onSubmit, children }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      return;
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      return;
    }
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <form className='login-form' name={formName} onSubmit={handleSubmit}>
      <h2 className='login-form__title'>{title}</h2>
      <fieldset className='login-form__fieldset'>
        {type === 'signup' &&
          <>
            <label
              for="name"
              className="login-form__label">
              Имя
            </label>
            <input
              type='text'
              id='name'
              name='name'
              minLength={1}
              maxLength={200}
              required
              autoComplete='off'
              className='login-form__input'
              onChange={handleChange}
              value={name}
            />
          </>
        }
        <label
          for="email"
          className="login-form__label">
          E-mail
        </label>
        <input
          type='email'
          id='email'
          name='email'
          minLength={6}
          maxLength={200}
          required
          autoComplete='off'
          className='login-form__input'
          onChange={handleChange}
          value={email}
        />
        <label
          for="password"
          className="login-form__label">
          Пароль
        </label>
        <input
          type='password'
          id='password'
          name='password'
          minLength={4}
          maxLength={200}
          required
          autoComplete='off'
          className='login-form__input'
          onChange={handleChange}
          value={password}
        />
      </fieldset>
      <button
        className='login-form__submit'
        type='submit'
        onSubmit={handleSubmit}
      >
        {submitText}
      </button>
    </form>
  );
}
