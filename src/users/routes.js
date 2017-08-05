const Celebrate = require('celebrate');

const schema = require('./schema');

function validate(schema) {
  const joiOptions = {
    abortEarly: false,
    stripUnknown: true
  };
  return Celebrate(schema, joiOptions);
}

function createUser(req, res) {
  const user = req.body;
  res.json(user);
}

module.exports = (app) => {
  app.post('/users', validate({ body: schema.createUser }), createUser);
};
