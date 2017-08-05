const express = require('express');
const BodyParser = require('body-parser');
const Celebrate = require('celebrate');

const db = require('./lib/db');

const app = express();

app.use(BodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

require('./users/routes')(app);

app.use(Celebrate.errors());

db.authenticate()
  .then(() => {
    app.listen(3000, () => {
      console.log('App listening on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
