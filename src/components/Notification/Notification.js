import React from 'react';
import successIcon from '../../images/success-message-icon.svg';
import errorIcon from '../../images/error-message-icon.svg';
import './Notification.css';

export default function Notification({ type, message, active }) {
  return (
    type === 'success' ?
      <div className={`notification notification_success ${active ? 'notification_active' : ''}`}>
        <img className='notification__icon' src={successIcon} alt='Иконка успех' />
        {message}
      </div> :
      <div className={`notification notification_error ${active ? 'notification_active' : ''}`}>
        <img className='notification__icon' src={errorIcon} alt='Иконка ошибка' />
        {message}
      </div>
  )
}
