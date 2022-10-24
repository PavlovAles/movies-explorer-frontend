export const NOTIFICATION_TYPES = {
  success: {
    login: { type: 'success', text: 'Успешный вход' },
    register: { type: 'success', text: 'Успешная регистрация' },
    userUpdate: { type: 'success', text: 'Профиль обновлен' },
    like: { type: 'success', text: 'Фильм сохранен' },
    dislike: { type: 'success', text: 'Фильм удален' },
  },
  error: {
    any: { type: 'error', text: 'Что-то пошло не так' }
  }
}
