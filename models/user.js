const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const { SALT_ROUND } = require('../configs')

const user = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Пожалуйста, укажите имя']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Пожалуйста, укажите email'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} - Не совсем валидный email ...`,
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 26,
    required: [true, 'Пожалуйста, укажите пароль'],
    select: false
  }
})

user.pre('save', function (next) {
  return bcrypt.hash(this.password, SALT_ROUND)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

module.exports = mongoose.model('user', user)
