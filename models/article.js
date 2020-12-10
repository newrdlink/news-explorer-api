const mongoose = require('mongoose')

const article = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false
  },
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} - Не совсем валидная ссылка ...`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} - Не совсем валидная ссылка ...`,
    },
  }
})

module.exports = mongoose.model('article', article)
