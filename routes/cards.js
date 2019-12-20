const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // Валидация с помощью celbrate до отправки на сервер

const {
  getCards,
  getCardById,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get(
  '/cards/:cardId',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  getCardById,
);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard,
);
router.delete(
  '/cards/:cardId',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCardById,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;
