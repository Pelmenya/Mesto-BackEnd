const Card = require('../models/card.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: err });
    });
};
