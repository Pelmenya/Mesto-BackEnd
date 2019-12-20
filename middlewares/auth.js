const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, process.env.KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  return next(); // пропускаем запрос дальше
};
