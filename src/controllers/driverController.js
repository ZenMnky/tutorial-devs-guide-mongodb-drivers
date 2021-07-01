const Driver = require('../models/Driver');
const helpers = require('./helpers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;
    console.log('query: ', req.query);
    const reqFields = { lng, lat };
    helpers.validateRequiredFields(res, reqFields);

    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: 'dist.calculated', // required
          maxDistance: 200000, // meters
          spherical: true,
        },
      },
    ])
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
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
  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndRemove({ _id: driverId })
      .then((driver) => {
        return res.status(204).send(driver);
      })
      .catch(next);
  },
};
