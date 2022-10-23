import React, { useEffect } from 'react';
import { isCorrectLength, isRequired, isValidEmail, isValidName } from '../../utils/validation';
import { useLocation } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import './LoginRegisterForm.css';

export default function LoginRegisterForm({ type, formName, title, submitText, error, onSubmit }) {
  const { values, isValid, errors, touched, changeHandler, reset } = useForm(
    { name: '', email: '', password: '' },
    [
      ({ name }) => (type === 'signin') || isValidName(name) || { name: 'Допустимы только латиница, кириллица, пробел или дефис' },
      ({ name }) => (type === 'signin') || isCorrectLength(name, 2, 30) || { name: 'Длина имени должна быть от 2 до 30 символов' },
      ({ name }) => (type === 'signin') || isRequired(name) || { name: 'Имя - обязательное поле' },
      ({ email }) => isValidEmail(email) || { email: 'Невалидный E-mail' },
      ({ email }) => isRequired(email) || { email: 'E-mail - обязательное поле' },
      ({ password }) => isRequired(password) || { password: 'Пароль - обязательное поле' },
    ],
  );

  const { pathname } = useLocation();

  useEffect(() => {
    reset();
  }, [pathname, reset]);

  function handleSubmit(e) {
    e.preventDefault();
    type === 'signup' ? onSubmit(values.name, values.password, values.email) : onSubmit(values.password, values.email);
  }

  return (
    <form className='register-form' name={formName} onSubmit={handleSubmit} noValidate>
      <h2 className='register-form__title'>{title}</h2>
      <fieldset className='register-form__fieldset'>
        {type === 'signup' &&
          <>
            <label
              htmlFor='name'
              className='register-form__label'
            >
              Имя
              <input
                type='text'
                id='name'
                name='name'
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
          className='register-form__label'
        >
          E-mail
          <input
            type='email'
            id='email'
            name='email'
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
          className='register-form__label'
        >
          Пароль
          <input
            type='password'
            id='password'
            name='password'
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
        {error && <p className='register-form__error register-form__error_top'>{error}</p>}
      </button>
    </form>
  );
}
