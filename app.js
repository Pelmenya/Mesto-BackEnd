const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const BadRequestError = require('./scripts/BadRequestError');
const errorsAll = require('./middlewares/errors');


const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');


require('dotenv').config(); // node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" генерация ключа

process.env.KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('./config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/userAuth'));

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (res, req, next) => {
  next(new BadRequestError('Запрашиваемый ресурс не найден')); // неправильная маршрутизация
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // ошибки с celebrate

app.use(errorsAll); // ошибки централизация

app.listen(PORT);
