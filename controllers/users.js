const User = require('../models/user')
const notFoundError = require('../errors')
const verifyPass = require('../utils/verifyPass')
const jwt = require('jsonwebtoken')
const { NODE_ENV, JWT_SECRET } = process.env


const getUserInfo = (req, res, next) => {
  res.send({ message: "gjreik" })
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
            const token = jwt.sign({
              id: user._id
            },
              NODE_ENV === 'PROD' ? JWT_SECRET : 'The time has come',
              { expiresIn: '7d' })
            return res.send(token)
          }
          const error = new notFoundError('Не правильный email или пароль')
          throw error
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