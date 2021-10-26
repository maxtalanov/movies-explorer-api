const userRoutes = require('./users');
const movieRouter = require('./movies');
const router404 = require('./not-found');

module.exports = {
  userRoutes,
  movieRouter,
  router404,
};
