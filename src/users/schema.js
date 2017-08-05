const Joi = require('joi');

const createUser = Joi.object().keys({
  email: Joi.string().email().required(),
  forename: Joi.string().required(),
  surname: Joi.string().required()
});

const updateUser = Joi.object().keys({
  email: Joi.string().email(),
  forename: Joi.string(),
  surname: Joi.string()
}).or('email', 'forename', 'surname');

const userId = Joi.object().keys({
  id: Joi.number().integer().required()
});

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  userId: userId
};
