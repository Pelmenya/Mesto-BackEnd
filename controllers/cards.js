const Card = require('../models/card.js');
const NotFoundError = require('../scripts/NotFoundError');
const FobidenError = require('../scripts/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length !== 0) {
        res.send({ data: cards });
      } else throw new NotFoundError('Ресурсы не созданы на сервере =)');
    })
    .catch(next);
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
      } else if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardRemove) => res.send({ remove: cardRemove }))
          .catch(next);
      } else throw new FobidenError('Недостаточно прав доступа к ресурсу');
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
