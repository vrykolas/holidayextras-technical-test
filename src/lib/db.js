const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database/db.sqlite');

const dir = path.dirname(dbPath);
if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

module.exports = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: dbPath
});
