require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/newsexplorerbd', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`app listening ${PORT}`)
})