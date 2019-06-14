const { Post, Comment } = require('../../database/models');

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
    }).sort({ createdAt: -1 }).populate('comments').populate({ path: 'comments', populate: { path: 'comments' } })
    .populate('tags')
    .populate('category');
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

const addComment = async ({
  user, body, params: { id }, query: { isChild },
}) => {
  const userFromRequest = user.user;
  if (isChild) {
    // eslint-disable-next-line no-use-before-define
    return addCommentToComment(id, body.content, userFromRequest.email);
  }

  const post = await Post.findById(id);

  // eslint-disable-next-line no-use-before-define
  if (!checkIfItsPublish(post)) return Promise.reject(new Error('Comments are not allowed on draft status'));

  // eslint-disable-next-line no-use-before-define
  const comment = createComment(body.content, userFromRequest.email);

  await comment.save();
  // eslint-disable-next-line no-underscore-dangle
  post.comments.push(comment._id);

  return post.save();
};

const addCommentToComment = async (id, content, author) => {
  const comment = await Comment.findById(id);
  // eslint-disable-next-line no-use-before-define
  const replayComment = createComment(content, author);
  await replayComment.save();
  // eslint-disable-next-line no-underscore-dangle
  comment.comments.push(replayComment._id);
  return comment.save();
};

// TODO Replace with enum
const checkIfItsPublish = post => post.status === 'publish';

const createComment = (content, author) => new Comment({
  body: content,
  authorName: author,
});

module.exports = {
  createPost,
  getPosts,
  editPost,
  ratePost,
  getPost,
  publishPost,
  addComment,
};
