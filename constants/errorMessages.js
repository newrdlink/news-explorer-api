const notFoundErrors = {
  badToken: 'Проблемы с токеном',
  articleNotFound: 'Уже нет такой статьи',
  badPath: ' - нет такого пути',
  userNotFound: 'нет такого пользователя',
};

const notAccessErrors = {
  forbidden: 'У вас нет прав',
};

const notAuthErrors = {
  noAuth: 'Нужна авторизация',
  reAuth: 'Необходима повторная авторизация',
  userNotFound: 'Нет такого пользователя',
  badEmailOrPass: 'Не правильный email или пароль',
};

const errorsInModels = {
  badLink: 'Не совсем валидная ссылка ...',
  badEmail: 'Не совсем валидный email ...',
};

const generalErrors = {
  emailRepeat: 'Такой email уже есть',
  failData: 'Дело в том, что это не валидные данные',
};

module.exports = {
  notFoundErrors,
  notAccessErrors,
  notAuthErrors,
  errorsInModels,
  generalErrors,
};
