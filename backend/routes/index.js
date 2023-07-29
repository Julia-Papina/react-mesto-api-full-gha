const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlwares/auth');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const { registerValidation, loginValidation } = require('../middlwares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);
router.get('/logout', logout);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
