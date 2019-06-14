const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { postStatus } = require('../../database/models');

const header = {
  header: Joi.object({
    Authorization: Joi.required(),
  }),
};

const createPostSchema = {
  header: Joi.object({
    Authorization: Joi.required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.string().valid(postStatus).required(),
    body: Joi.string().required(),
    categoryId: Joi.objectId().required(),
    tagIds: Joi.array().items(Joi.objectId()),
  }),
};

const getPostSchema = {
  header: header.header,
  query: Joi.object().keys({
    authorName: Joi.string().optional(),
    title: Joi.string().optional(),
    my: Joi.boolean().optional(),
  }),
};

module.exports = {
  POST: {
    '/': createPostSchema,
  },
  GET: {
    '/': getPostSchema,
  },
};
