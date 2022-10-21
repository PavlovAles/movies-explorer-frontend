import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import './LoginRegisterForm.css';

export default function LoginRegisterForm({ type, formName, title, submitText, onSubmit }) {
  const { values, setValues, changeHandler } = useForm({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    type === 'signup' ? onSubmit(values.name, values.password, values.email) : onSubmit(values.password, values.email);
    setValues({ name: '', email: '', password: '' });
  }

  return (
    <form className='register-form' name={formName} onSubmit={handleSubmit}>
      <h2 className='register-form__title'>{title}</h2>
      <fieldset className='register-form__fieldset'>
        {type === 'signup' &&
          <>
            <label
              htmlFor='name'
              className='register-form__label'>
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
              className='register-form__input'
              onChange={changeHandler}
              value={values.name}
            />
          </>
        }
        <label
          htmlFor='email'
          className='register-form__label'>
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
          className='register-form__input'
          onChange={changeHandler}
          value={values.email}
        />
        <label
          htmlFor='password'
          className='register-form__label'>
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
          className='register-form__input'
          onChange={changeHandler}
          value={values.password}
        />
      </fieldset>
      <button
        className='register-form__submit'
        type='submit'
        onSubmit={handleSubmit}
      >
        {submitText}
      </button>
    </form>
  );
}
