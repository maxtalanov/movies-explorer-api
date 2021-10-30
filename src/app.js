const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { userRoutes, movieRouter, router404 } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorHandler = require('./middlewares/Central-Error-Handler');
const {
  optionsMongooseConfig,
  mongoURL,
  PORT,
} = require('./utils/const');

const app = express();

// Логер запросов
app.use(requestLogger);

// Контролер кол-ва запросов 1=>IP
app.use(limiter);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Конектинг БД
mongoose.connect(mongoURL, optionsMongooseConfig);

// Заголовки безопасности
app.use(helmet());
// Обработчики роутов
app.use(userRoutes);
app.use(movieRouter);
app.use(router404);

// Логер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
