const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { urlRegEx } = require('../consts');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(400).send(`Пользователя с id : ${req.params.userId} не существует!`);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(400).send(`Неправильный id : ${req.params.userId} `);
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (password) {
    return bcrypt
      .hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res
        .status(201)
        .send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
  return res.status(400).send({ message: 'Отсутствует пароль пользователя !' });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const result = avatar.match(urlRegEx);
  if (result !== null) {
    if (result[0].length === avatar.length) {
      User.findByIdAndUpdate(req.user._id, { avatar })
        .then((user) => res.send({ data: user }))
        .catch((err) => res.status(500).send({ message: err.message }));
    } else res.status(400).send({ message: 'Некорректный URL аватара' });
  } else res.status(400).send({ message: 'Некорректный URL аватара' });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.KEY, { expiresIn: '7d' });
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send({ message: 'Аутентификация успешна !!!' })
          .end();
      })
      .catch((err) => {
        // ошибка аутентификации
        res.status(401).send({ message: err.message });
      });
  }
  return res.status(401).send({ message: 'Отсутсвует email или пароль !!! ' });
};
