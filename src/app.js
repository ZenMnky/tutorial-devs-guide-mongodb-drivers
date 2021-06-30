require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');

const { DATABASE_CONNECTION, NODE_ENV } = process.env;
const mongoose = require('mongoose');

if (NODE_ENV !== 'test') {
  mongoose.connect(DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

const db = mongoose.connection;
db.once('open', function () {
  console.log('Connected to DB');
}).on('error', (error) => {
  console.error('DB Connection error: ', error);
});

app.use(helmet());
app.use(cors());
app.use(express.json());

routes(app);

module.exports = app;
