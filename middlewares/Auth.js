const { NotAuthError } = require('../errors');
const jwt = require('jsonwebtoken')
const { JWT_WORD } = require('../constants')

module.exports = (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Нужна авторизация');
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, JWT_WORD);
  } catch (error) {
    throw new NotAuthError('Необходима повторная авторизация');
  }
  
  req.user = payload;

  next();
}

