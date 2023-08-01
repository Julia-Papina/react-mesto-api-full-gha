require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('./middlwares/cors');
const router = require('./routes/index');
const error = require('./middlwares/error');
const { requestLogger, errorLogger } = require('./middlwares/logger');

const { DEV_DB_HOST } = require('./utils/config');

mongoose.connect(
  NODE_ENV === 'production' && DB_URL
    ? DB_URL : DEV_DB_HOST,
)
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
  });

app.use(express.json());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cookieParser());

app.use(cors);

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`Слушаю порт!!!!!: ${PORT}`);
});
