const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('home route');
});

module.exports = app;
