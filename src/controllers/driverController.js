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
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    if (driverProps.email === undefined && driverProps.driving === undefined) {
      return res.status(422).json({
        error: { message: `Missing valid fields in request body` },
      });
    }

    const updateProps = {};
    if (driverProps.email) {
      updateProps.email = driverProps.email;
    }
    if (driverProps.driving) {
      updateProps.driving = driverProps.driving;
    }

    Driver.findByIdAndUpdate({ _id: driverId }, updateProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then((driver) => res.status(201).send(driver))
      .catch(next);
  },
};
