const router = require('express').Router();

const {
  getCards,
  getCardById,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:cardId', getCardById);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
