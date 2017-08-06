const Celebrate = require('celebrate');
const Sequelize = require('sequelize');

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
    .catch((err) => {
      if(err instanceof Sequelize.UniqueConstraintError) {
        return res.status(400).json({
          error: 'A user with that email aready exists'
        });
      }
      res.status(500).json({
        error: 'There was a problem saving the user'
      });
    });
}

function deleteUser(req, res) {
  const userId = req.params.id;
  User.findById(userId)
    .then((model) => {
      if(!model) {
        return res.status(404).json({
          error: 'The user does not exist'
        });
      }

      return model.destroy({ force: true })
        .then(() => {
          res.json({});
        });
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was a problem deleting the user'
      });
    });
}

function getUsers(req, res) {
  User.findAll()
    .then((models) => {
      const users = models.map((model) => {
        return model.toJSON();
      });
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was a problem retrieving the users'
      });
    });
}

function getUserById(req, res) {
  const userId = req.params.id;
  User.findById(userId)
    .then((model) => {
      if(!model) {
        return res.status(404).json({
          error: 'The user does not exist'
        });
      }

      res.json(model.toJSON());
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was a problem retrieving the user'
      });
    });
}

function updateUser(req, res) {
  User.findById(req.params.id)
    .then((model) => {
      if(!model) {
        return res.status(404).json({
          error: 'The user does not exist'
        });
      }

      return model.update(req.body)
        .then((model) => {
          res.json(model.toJSON());
        });
    })
    .catch((err) => {
      if(err instanceof Sequelize.UniqueConstraintError) {
        return res.status(400).json({
          error: 'A user with that email aready exists'
        });
      }
      res.status(500).json({
        error: 'There was a problem updating the user'
      });
    });
}

module.exports = (app) => {
  app.post('/users', validate({ body: schema.createUser }), createUser);
  app.delete('/users/:id', validate({ params: schema.userId }), deleteUser);
  app.get('/users', validate({ body: schema.createUser }), getUsers);
  app.get('/users/:id', validate({ params: schema.userId }), getUserById);
  app.put(
    '/users/:id',
    validate({
      params: schema.userId,
      body: schema.updateUser
    }),
    updateUser
  );
};
