const Sequelize = require('sequelize');
const db = require('../lib/db');

const User = db.define(
  'user',
  {
    email: {
      type: Sequelize.STRING
    },
    forename: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    }
  },
  {
    createdAt: 'created',
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        unique: true,
        fields: [
          'email'
        ]
      }
    ]
  }
);

User.sync();

module.exports = User;
