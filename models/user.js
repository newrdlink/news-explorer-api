const mongoose = require('mongoose')
const validator = require('validator')

const user = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: [true, 'Пожалуйста, укажите имя']
    },
    email: {
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
        required: [true, 'Пожалуйста, укажите пароль'],
        select: false
    }
})

module.exports = mongoose.model('user', user)
