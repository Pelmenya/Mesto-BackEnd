const routerUsers = require('express').Router();
const users = require('../data/users');

routerUsers.get('/users/', (req, res) => {
  res.send(users);
});

routerUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const result = users.find(({ _id }) => _id === id);

  if (!result) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.status(200).send(result);
});

module.exports = routerUsers;
