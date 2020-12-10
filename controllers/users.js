const User = require('../models/user')
const { NotFoundError } = require('../errors')
const verifyPass = require('../utils/verifyPass')
const decodeToken = require('../utils/verifyToken')
const jwt = require('jsonwebtoken')
const JWT_WORD = require('../constants')


const getUserInfo = (req, res, next) => {
  const { authorization: token } = req.headers

  decodeToken(token)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Проблемы с токеном')
      }
      const { id: _id } = result

      User.findById({ _id })
        .then((user) => res.send({ email: user.email, name: user.name }))
        .catch(next)
    })
    .catch(next)
}

const userCreate = (req, res, next) => {
  const { email, password, name } = req.body

  User.create({ email, password, name })
    .then((user) => res.send(user))
    .catch(next)
}

const login = (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email }).select('+password')
    .then((user) => {
      verifyPass(password, user.password)
        .then((match) => {
          if (match) {
            const token = jwt.sign({ id: user._id }, JWT_WORD, { expiresIn: '7d' })
            return res.send(token)
          }
          throw new NotFoundError('Не правильный email или пароль')
        })
        .catch(next)
    })
    .catch(next)
}

module.exports = {
  getUserInfo,
  userCreate,
  login
}