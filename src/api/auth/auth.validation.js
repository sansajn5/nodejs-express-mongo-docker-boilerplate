const Joi = require('joi');

const registerSchema = {
  body: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(16)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(16)
      .required(),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(16)
      .required(),
  }),
};

module.exports = {
  POST: {
    '/register': registerSchema,
    '/login': loginSchema,
  },
};
