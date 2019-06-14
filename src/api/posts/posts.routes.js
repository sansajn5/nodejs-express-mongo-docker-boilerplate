const express = require('express');

const router = express.Router();

const requestValidator = require('../../middlewares/request.validator');
const postsSchema = require('./posts.validation');

// eslint-disable-next-line no-unused-vars
const {
  createPost, getPosts, getPost, ratePost, editPost, publishPost, addComment,
} = require('./posts.service');

/**
 * Adding validation on each http request
 */
router.use((req, res, next) => requestValidator.validateRequest(postsSchema, req, res, next));

router.post('', (req, res) => createPost(req.body, req.user)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

router.get('', (req, res) => getPosts(req)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

router.put('/:id', (req, res) => editPost(req)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

router.patch('/:action/:id', (req, res) => {
  let response;
  const { action } = req.params;
  switch (action) {
    case 'rate':
      response = ratePost;
      break;
    case 'publish':
      response = publishPost;
      break;
    case 'comment':
      response = addComment;
      break;
    default:
      res.json(`Action ${action} does not exist`, 400);
  }
  response(req)
    .then(data => res.json(data))
    .catch(err => res.json(err.message, 500));
});

router.get('/:id', (req, res) => getPost(req.params)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

module.exports = router;
