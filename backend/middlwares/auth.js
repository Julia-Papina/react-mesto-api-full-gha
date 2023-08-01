const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  // process.env.NODE_ENV === 'production'
  //  ? process.env.JWT_SECRET
  //  : 'dev-secret',
  // );
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
