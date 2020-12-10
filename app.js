require('dotenv').config()

const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')
const app = express()
const { errors } = require('celebrate')
const { PORT = 3000 } = process.env

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/newsexplorerbd', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.use(errors())
app.use((error, req, res, next) => {
  // console.log(error)
  if (error.code === 11000) {
    return res.status(409).send({ message: "Такой email уже есть" })
  }
  if (error.kind === 'ObjectId') {
    return res.status(400).send({ message: 'Дело в том, что это не валидные данные' });
  }
  next()
  return res.status(error.statusCode || 500).send({ message: error.message })
  //return res.status(error.statusCode || 500).send(error)
})
// const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env
app.listen(PORT, () => {
  console.log(`app listening ${PORT}`)
})
