require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { BD_ADD } = require('./config');
const errCtl = require('./middlewares/handlerErrors');
const rateLimit = require('./utils/reqLimiter');

const app = express();

// const handlerCors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

mongoose.connect(BD_ADD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet.contentSecurityPolicy());
// app.use(handlerCors);
app.use(cors());

app.use(requestLogger);

app.use(rateLimit);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errCtl);

app.listen(PORT, () => {
  console.log(`app listening ${PORT}`);
});
