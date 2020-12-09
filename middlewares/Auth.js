const NotAuthError = require('../errors/not-auth-err');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env

module.exports = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new NotAuthError('Нужна авторизация');
    }

    const token = authorization.replace('Bearer ', '')
    let payload

    try {
        payload = jwt.verify(token, NODE_ENV === 'PROD' ? JWT_SECRET : 'The time has come');
    } catch (error) {
        throw new NotAuthError('Необходима повторная авторизация');
    }

    req.user = payload;

    next();
}

