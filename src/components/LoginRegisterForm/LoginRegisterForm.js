import React from 'react';
import { isRequired, isValidEmail } from '../../utils/validation';
import useForm from '../../hooks/useForm';
import './LoginRegisterForm.css';

export default function LoginRegisterForm({ type, formName, title, submitText, onSubmit }) {
  const { values, setValues, isValid, errors, touched, changeHandler } = useForm(
    { name: '', email: '', password: '' },
    [
      ({ name }) => isRequired(name) || { name: 'Имя - обязательное поле' },
      ({ email }) => isValidEmail(email) || { email: 'Невалидный E-mail' },
      ({ email }) => isRequired(email) || { email: 'E-mail - обязательное поле' },
      ({ password }) => isRequired(password) || { password: 'Пароль - обязательное поле' },
    ],
  );

  function handleSubmit(e) {
    e.preventDefault();
    type === 'signup' ? onSubmit(values.name, values.password, values.email) : onSubmit(values.password, values.email);
    setValues({ name: '', email: '', password: '' });
  }

  return (
    <form className='register-form' name={formName} onSubmit={handleSubmit} novalidate>
      <h2 className='register-form__title'>{title}</h2>
      <fieldset className='register-form__fieldset'>
        {type === 'signup' &&
          <>
            <label
              htmlFor='name'
              className='register-form__label'>
              Имя
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
              {touched.name && errors.name && <p className='register-form__error'>{errors.name}</p>}
            </label>
          </>
        }
        <label
          htmlFor='email'
          className='register-form__label'>
          E-mail
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
          {touched.email && errors.email && <p className='register-form__error'>{errors.email}</p>}
        </label>
        <label
          htmlFor='password'
          className='register-form__label'>
          Пароль
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
          {touched.password && errors.password && <p className='register-form__error'>{errors.password}</p>}
        </label>
      </fieldset>
      <button
        className='register-form__submit'
        type='submit'
        disabled={!isValid}
        onSubmit={handleSubmit}
      >
        {submitText}
      </button>
    </form>
  );
}
