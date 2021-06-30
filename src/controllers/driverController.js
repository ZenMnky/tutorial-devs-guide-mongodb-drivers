const Driver = require('../models/Driver');
const helpers = require('./helpers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  create(req, res, next) {
    let { email, driving } = req.body;
    const reqFields = { email };
    helpers.validateRequiredFields(res, reqFields);
    if (driving === undefined) {
      driving = false;
    }
    const driverProps = { email, driving };
    Driver.create(driverProps)
      .then((driver) => res.status(201).send(driver))
      .catch(next);
  },
};
