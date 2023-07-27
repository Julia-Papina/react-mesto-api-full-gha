const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlwares/validation');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, addCardLike);
router.delete('/:cardId/likes', validateCardId, deleteCardLike);

module.exports = router;
