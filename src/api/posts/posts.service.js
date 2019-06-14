const { Post } = require('../../database/models');

const createPost = async ({
  title,
  status,
  body,
  categoryId,
  tagIds,
}, { user }) => {
  const post = new Post({
    title,
    status,
    body,
    authorName: user.email,
    category: categoryId,
    tags: tagIds,
  });

  return post.save();
};

const getPosts = ({ user, query }) => {
  const userFromRequest = user.user;
  const filter = JSON.parse(JSON.stringify(query));
  if (query.my) {
    if (query.authorName && query.authorName !== userFromRequest.email) {
      return Promise.reject(new Error('Author name must be same as your username with this filter options'));
    }
    delete filter.my;
    filter.authorName = userFromRequest.email;
  }
  return Post.find(Object.assign({ status: 'publish' }, filter),
    (err, result) => {
    // eslint-disable-next-line no-unused-expressions
      err ? Promise.reject(err) : Promise.resolve(result);
    }).sort({ createdAt: -1 });
};

const editPost = async ({ user, params: { id }, body }) => {
  const userFromRequest = user.user;
  const post = await Post.findById(id);

  if (userFromRequest.email !== post.authorName) return Promise.reject(new Error('Only author can edit his post'));

  // eslint-disable-next-line no-use-before-define
  if (checkIfItsPublish(post)) return Promise.reject(new Error('Only draft post can be edited'));

  Object.assign(post, body);

  return post.save();
};

const ratePost = async ({ user, params: { id }, body }) => {
  const userFromRequest = user.user;
  const post = await Post.findById(id);

  // TODO send to joi validator when id param in middelware is resolved
  if (Number.isNaN(body.value)) return Promise.reject(new Error('Value should be number'));

  const value = Number(body.value);

  if (value < 1 || value > 10) return Promise.reject(new Error('Rate should be between 1-10'));

  if (post.rates.some(rate => rate.ratedBy === userFromRequest.email)) return Promise.reject(new Error('You have already rate this post'));

  if (post.authorName === userFromRequest.email) return Promise.reject(new Error('You cannot rate your own post'));

  // eslint-disable-next-line no-use-before-define
  if (!checkIfItsPublish(post)) return Promise.reject(new Error('You cannot rate post if it is not in publish state'));

  post.rates.push({
    value,
    ratedBy: userFromRequest.email,
  });

  return post.save();
};

const getPost = ({ id }) => Post.findById(id);

const publishPost = async ({ user, params: { id } }) => {
  const userFromRequest = user.user;
  const post = await Post.findById(id);

  // eslint-disable-next-line no-use-before-define
  if (checkIfItsPublish(post)) return Promise.reject(new Error('This post is already published'));

  if (post.authorName !== userFromRequest.email) return Promise(new Error('You can publish your own posts'));

  // TODO replace with enum
  post.status = 'publish';

  return post.save();
};

// TODO Replace with enum
const checkIfItsPublish = post => post.status === 'publish';

module.exports = {
  createPost,
  getPosts,
  editPost,
  ratePost,
  getPost,
  publishPost,
};
