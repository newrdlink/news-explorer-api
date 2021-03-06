const jwt = require('jsonwebtoken');
const verifyPass = require('../utils/verifyPass');
const decodeToken = require('../utils/verifyToken');
const NotAuthError = require('../errors/not-auth-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { notFoundErrors, notAuthErrors, generalErrors } = require('../constants/errorMessages');
const User = require('../models/user');
const { JWT_WORD } = require('../config');

const getUserInfo = (req, res, next) => {
  const { authorization: token } = req.headers;

  decodeToken(token)
    .then((result) => {
      if (!result) {
        throw new NotFoundError(notFoundErrors.badToken);
      }
      const { id: _id } = result;

      User.findById({ _id })
        .orFail(() => {
          throw new NotFoundError(notFoundErrors.userNotFound);
        })
        .then((user) => res.send({ email: user.email, name: user.name }))
        .catch(next);
    })
    .catch(next);
};

const userCreate = (req, res, next) => {
  const { email, password, name } = req.body;

  User.create({ email, password, name })
    .then((user) => res.send({ id: user._id, email: user.email }))
    .catch((error) => {
      if (error.code === 11000 && error.name === 'MongoError') {
        return next(new ConflictError(generalErrors.emailRepeat));
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError(notAuthErrors.userNotFound);
      } else {
        verifyPass(password, user.password)
          .then((match) => {
            if (match) {
              const token = jwt.sign({ id: user._id }, JWT_WORD, { expiresIn: '7d' });
              return res.send({ token });
            }
            throw new NotAuthError(notAuthErrors.badEmailOrPass);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  userCreate,
  login,
};
