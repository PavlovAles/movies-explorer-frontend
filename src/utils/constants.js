const NOTIFICATION_TYPES = {
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

const SHORT_MOVIE_DURATION = 40;

const BIG_SCREEN_INITIAL_CARDS_AMOUNT = 12;
const MEDIUM_SCREEN_INITIAL_CARDS_AMOUNT = 8;
const SMALL_SCREEN_INITIAL_CARDS_AMOUNT = 5;

const BIG_SCREEN_CARDS_TO_ADD = 3;
const SMALL_SCREEN_CARDS_TO_ADD = 2;

export {
  NOTIFICATION_TYPES,
  SHORT_MOVIE_DURATION,
  BIG_SCREEN_INITIAL_CARDS_AMOUNT,
  MEDIUM_SCREEN_INITIAL_CARDS_AMOUNT,
  SMALL_SCREEN_INITIAL_CARDS_AMOUNT,
  BIG_SCREEN_CARDS_TO_ADD,
  SMALL_SCREEN_CARDS_TO_ADD
};