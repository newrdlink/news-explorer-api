require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

const handlerCors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsexplorerbd', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet.contentSecurityPolicy());
app.use(handlerCors);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use((error, req, res, next) => {
  console.log(error);
  if (error.code === 11000) {
    return res.status(409).send({ message: 'Такой email уже есть' });
  }
  if (error.kind === 'ObjectId') {
    return res.status(400).send({ message: 'Дело в том, что это не валидные данные' });
  }
  next();
  return res.status(error.statusCode || 500).send({ message: error.message });
  // return res.status(error.statusCode || 500).send(error)
});

app.listen(PORT, () => {
  console.log(`app listening ${PORT}`);
});
