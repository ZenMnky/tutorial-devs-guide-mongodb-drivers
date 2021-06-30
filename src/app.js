const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');

app.use(helmet());
app.use(cors());
app.use(express.json());

routes(app);

module.exports = app;
