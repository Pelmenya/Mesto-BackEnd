// user
const mongoose = require('mongoose');
const { urlRegEx } = require('../consts');

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
    required: true, // оно должно быть у каждого пользователя, так что инфа — обязательное поле
  },
  avatar: {
    type: String,
    match: urlRegEx,
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
});

module.exports = mongoose.model('user', userSchema);
