import { generateId } from './utils';

export const NOTIFICATION_TYPES = {
  success: {
    login: { type: 'success', text: 'Успешный вход', id: generateId() },
    register: { type: 'success', text: 'Успешная регистрация', id: generateId() },
    like: { type: 'success', text: 'Фильм сохранен', id: generateId() },
    dislike: { type: 'success', text: 'Фильм удален', id: generateId() },
    profileUpdate: { type: 'success', text: 'Профиль обновлен', id: generateId() },
  },
  erorr: {
    any: { type: 'error', text: 'Что-то пошло не так', id: generateId() }
  }
}