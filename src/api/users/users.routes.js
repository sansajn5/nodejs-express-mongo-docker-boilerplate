const express = require('express');

const router = express.Router();

const {
  getAll,
} = require('./users.services');

/**
 * Handles /GET /api/users HTTP request
 *
 * Fetching all system users
 *
 */
router.get('', (req, res) => getAll()
  .then(data => res.json(data))
  .catch(err => res.json(err, 500)));

module.exports = router;
