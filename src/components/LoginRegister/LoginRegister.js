import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom';
import logo from '../../images/logo.svg';
import LoginSigninForm from '../LoginRegisterForm/LoginRegisterForm';
import './LoginRegister.css';

export default function LoginRegister({ type, formName, title, submitText, error, loggedIn, onSubmit }) {
  if (loggedIn) {
    return (
      <Route>
        <Redirect to='/movies' />
      </Route>
    )
  }

  return (
    <section className='register'>
      <div className='register__wrapper'>
        <Link to='/' className='register__homelink'>
          <img src={logo} className='register__logo' alt='Логотип' />
        </Link>
        <LoginSigninForm type={type} formName={formName} title={title} submitText={submitText} error={error} onSubmit={onSubmit} />
        {type === 'signup' ?
          <p className='register__redirect'>
            Уже зарегистрированы?
            <Link to='/signin' className='register__link'>
              Войти
            </Link>
          </p> :
          <p className='register__redirect'>
            Ещё не зарегистрированы?
            <Link to='/signup' className='register__link'>
              Зарегистрироваться
            </Link>
          </p>
        }
      </div>
    </section>
  )
}
