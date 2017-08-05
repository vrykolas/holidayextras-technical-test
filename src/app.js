const express = require('express');
const BodyParser = require('body-parser');
const Celebrate = require('celebrate');

const app = express();

app.use(BodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

require('./users/routes')(app);

app.use(Celebrate.errors());

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

module.exports = app;
