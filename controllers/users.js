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
        res.status(404).send(`Пользователя с id : ${req.params.userId} не существует!`);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Неправильный id : ${req.params.userId} `);
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
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
