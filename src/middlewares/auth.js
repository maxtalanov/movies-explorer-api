const jwt = require('jsonwebtoken');
const UnauthorizedErrors = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET, JWT_DEV = 'some-secret-key' } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers; УДАЛИТЬ!
  const cookiesJWT = req.cookies.jwt;

  if (!cookiesJWT) {
    throw new UnauthorizedErrors('Необходима авторизация');
  }

  const token = cookiesJWT.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedErrors('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса;
  next(); // пропускаем запрос дальше
};
