const { authRoutes } = require('./auth');
const { userRoutes } = require('./users');
const { postRoutes } = require('./posts');
const { tagRoutes } = require('./tags');
const { categoryRoutes } = require('./categories');

module.exports = {
  authRoutes,
  userRoutes,
  postRoutes,
  tagRoutes,
  categoryRoutes,
};
