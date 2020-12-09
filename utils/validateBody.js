const { celebrate, Joi } = require('celebrate')

const isValidBodyCreateUser = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(26),
  })
})

const isValidBodyLoginUser = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })
})

module.exports = {
  isValidBodyCreateUser,
  isValidBodyLoginUser
}
