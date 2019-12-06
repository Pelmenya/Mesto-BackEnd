const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');

require('dotenv').config(); // node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" генерация ключа

process.env.KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('./config');

const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{ "message": "Запрашиваемый ресурс не найден" }', 404);
});

app.listen(PORT);
