const mongoose = require('mongoose')

const article = new mongoose.Schema({
    owner: {
        type: String,
        required: [true, 'Пожалуйста, укажите создателя'],
    },
    keyword: {
        type: String,
        required: [true, 'Пожалуйста, укажите ключевое слово'],
    },
    title: {
        type: String,
        required: [true, 'Пожалуйста, укажите заголовок статьи']
    },
    text: {
        type: String,
        required: [true, 'Пожалуйста, укажите текст статьи']
    },
    date: {
        type: String,
        required: [true, 'Пожалуйста, укажите дату статьи']
    },
    source: {
        type: String,
        required: [true, 'Пожалуйста, укажите источник статьи']
    },
    link: {
        type: String,
        required: [true, 'Пожалуйста, укажите ссылку на статьи'],
        validate: {
            validator(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: (props) => `${props.value} - Не совсем валидная ссылка ...`,
        },
    },
    image: {
        type: String,
        required: [true, 'Пожалуйста, укажите ссылку на иллюстрацию к статье'],
        validate: {
            validator(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: (props) => `${props.value} - Не совсем валидная ссылка ...`,
        },
    }
})

module.exports = mongoose.model('article', article)
