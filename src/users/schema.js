const Joi = require('joi');

const createUser = {
  email: Joi.string().email().required(),
  forename: Joi.string().required(),
  surname: Joi.string().required()
};

module.exports = {
  createUser: createUser
};
