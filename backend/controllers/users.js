const bcript = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const OK = 200;
const CREATED = 201;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcript.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({
        ...req.body, password: hashedPassword,
      })
        .then((user) => res.status(CREATED).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else if (err.code === 11000) {
            next(new ConflictError('Такой пользователь уже сущетсвует'));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthorizedError({ message: 'Необходима авторизация' });
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Пользователь не найден, авторизуйтесь'))
    .then((user) => {
      bcript.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, process.env.JWT_SECRET);
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.send(user.toJSON());
            console.log('аутентификация прошла успешно');
          } else {
            next(new BadRequestError('Неправильные почта или пароль'));
          }
        });
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      }
    })
    .catch((err) => next(err));
};

const updateUserFields = (req, res, next, updateFields) => {
  User.findByIdAndUpdate(
    req.user._id,
    updateFields,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  updateUserFields(req, res, next, { name, about });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserFields(req, res, next, { avatar });
};

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
