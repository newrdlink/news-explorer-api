const notFoundErrors = {
  badToken: 'Проблемы с токеном',
  userNotFound: 'Нет такого пользователя',
  badEmailOrPassword: 'Не правильный email или пароль',
  articleNotFound: 'Уже нет такой статьи',
  badPath: ' - нет такого пути',
};

const notAccessErrors = {
  forbidden: 'У вас нет прав',
};

const notAuthErrors = {
  noAuth: 'Нужна авторизация',
  reAuth: 'Необходима повторная авторизация',
};

const errorsInModels = {
  badLink: 'Не совсем валидная ссылка ...',
  badEmail: 'Не совсем валидный email ...',
};

module.exports = {
  notFoundErrors,
  notAccessErrors,
  notAuthErrors,
  errorsInModels,
};
