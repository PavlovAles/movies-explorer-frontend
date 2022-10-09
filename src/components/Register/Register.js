import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import LoginSigninForm from '../LoginSigninForm/LoginSigninForm';
import './Register.css';


export default function Register() {
  return (
    <section className='register'>
      <div className='register__wrapper'>
        <Link to='/' className='register__homelink'>
          <img src={logo} className='register__logo' alt='Логотип' />
        </Link>
        <LoginSigninForm type='signup' formName='signup' title='Добро пожаловать!' submitText='Зарегистрироваться' onSubmit={() => { }} />
        <p className='register__redirect'>
          Уже зарегистрированы?
          <Link to='/signin' className='register__link'>
            Войти
          </Link>
        </p>
      </div>
    </section>
  )
}
