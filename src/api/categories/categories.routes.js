const express = require('express');

const router = express.Router();

const {
  getCategories,
} = require('./categories.service');

router.get('', (req, res) => getCategories()
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));


module.exports = router;
