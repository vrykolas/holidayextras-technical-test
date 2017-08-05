const Joi = require('joi');

const createUser = Joi.object().keys({
  email: Joi.string().email().required(),
  forename: Joi.string().required(),
  surname: Joi.string().required()
});

const userId = Joi.object().keys({
  id: Joi.number().integer().required()
});

module.exports = {
  createUser: createUser,
  userId: userId
};
