const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const driverRouter = require('./routes/driverRoutes');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api', driverRouter);

module.exports = app;
