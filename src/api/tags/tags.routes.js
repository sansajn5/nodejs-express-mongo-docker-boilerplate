const express = require('express');

const router = express.Router();

const {
  createTag,
  getTags,
} = require('./tags.service');

router.get('', (req, res) => getTags()
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

router.post('', (req, res) => createTag(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

module.exports = router;
