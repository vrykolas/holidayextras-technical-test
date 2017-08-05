const Celebrate = require('celebrate');

const User = require('./model');
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
  User.create(user)
    .then((model) => {
      res.json(model.toJSON());
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was a problem saving the user'
      });
    });
}

module.exports = (app) => {
  app.post('/users', validate({ body: schema.createUser }), createUser);
};
