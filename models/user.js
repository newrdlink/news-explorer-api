const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../config');
const { errorsInModels } = require('../constants/errorMessages');

const user = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => errorsInModels.badEmail,
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 26,
    required: true,
    select: false,
  },
});

user.pre('save', function (next) {
  return bcrypt.hash(this.password, SALT_ROUND)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

module.exports = mongoose.model('user', user);
