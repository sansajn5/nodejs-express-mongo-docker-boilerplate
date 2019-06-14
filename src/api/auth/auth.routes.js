const express = require('express');

const router = express.Router();

const requestValidator = require('../../middlewares/request.validator');
const authSchema = require('./auth.validation');

const { me, register, login } = require('./auth.service');

/**
 * Adding validation on each http request
 */
router.use((req, res, next) => requestValidator.validateRequest(authSchema, req, res, next));

/**
 * Handles /GET /api/auth/me HTTP request
 *
 * Providing current user data
 *
 */
router.get('/me', (req, res) => res.json(me(req.user)));

/**
 * Handles /POST /api/auth/register HTTP request
 *
 * Creating new user
 *
 */
router.post('/register', (req, res) => register(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err, 500)));

/**
 * Handles /POST /api/auth/login HTTP request
 *
 * Login user into system
 *
 */
router.post('/login', (req, res) => login(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));

module.exports = router;
