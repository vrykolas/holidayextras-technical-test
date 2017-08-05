const Joi = require('joi');

const createUser = {
  email: Joi.string().email().required(),
  forename: Joi.string().required(),
  surname: Joi.string().required()
};

const userId = {
  id: Joi.number().integer().required()
};

module.exports = {
  createUser: createUser,
  userId: userId
};
