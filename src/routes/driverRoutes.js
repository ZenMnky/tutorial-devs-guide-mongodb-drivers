const express = require('express');

const driverRouter = express.Router();

driverRouter.route('/api').get((req, res, next) => {
  res.json({ hi: 'there' });
});

module.exports = driverRouter;
