const User = require('./user.model');
const { Post, postStatus } = require('./post.model');
const Comment = require('./comment.model');
const Tag = require('./tag.model');
const Category = require('./category.model');

module.exports = {
  User,
  Post,
  Category,
  Tag,
  Comment,
  postStatus,
};
