require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`app listening ${PORT}`)
})