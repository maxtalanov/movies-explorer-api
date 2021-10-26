const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const limiter = require('./middlewares/limiter');
const { errors } = require('celebrate');
const { userRoutes, movieRouter, router404 } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// Контролер кол-ва запросов 1=>IP
app.use(limiter);
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Конектинг БД
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Логер запросов
app.use(requestLogger);

// Обработчики роутов
app.use(userRoutes);
app.use(movieRouter);
app.use(router404);

// Логер ошибок
app.use(errorLogger)

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
});
