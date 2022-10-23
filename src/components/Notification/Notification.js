import React, { useEffect, useState } from 'react';
import successIcon from '../../images/success-message-icon.svg';
import errorIcon from '../../images/error-message-icon.svg';
import './Notification.css';

export default function Notification({ notificationList }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...notificationList]);
  }, [notificationList]);

  useEffect(() => {
    function deleteToast(id) {
      const listItemIndex = list.findIndex(e => e.id === id);
      const toastListItem = notificationList.findIndex(e => e.id === id);
      list.splice(listItemIndex, 1);
      notificationList.splice(toastListItem, 1);
      setList([...list]);
    }

    const interval = setInterval(() => {
      if (notificationList.length && list.length) {
        deleteToast(notificationList[0].id);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    }
  }, [notificationList, list]);

  return (
    <ul className='notification__container'>
      {list.map(item => (
        <div key={item.id} className={`notification__item ${'notification__item_' + item.type}`}>
          <img className='notification__icon' src={(item.type === 'success') ? successIcon : errorIcon} alt='Иконка' />
          {item.text}
        </div>
      ))}
    </ul>
  )
}
