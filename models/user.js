// user
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const { urlRegEx } = require('../consts');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  about: {
    // О пользователе — опишем требования к имени в схеме:
    type: String, // инфа — это строка
    minlength: 2, // минимальная длина инфы — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    match: urlRegEx,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неправильный формат e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function authenticationUser(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return user; // теперь user доступен
    });
  });
};

module.exports = mongoose.model('user', userSchema);
