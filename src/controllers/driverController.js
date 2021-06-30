const Driver = require('../models/Driver');

const validateRequiredFields = (res, reqFields) => {
  for (const [key, value] of Object.entries(reqFields)) {
    if (!value) {
      return res.status(400).json({
        error: { message: `Missing ${key} in request body` },
      });
    }
  }
};

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  create(req, res) {
    let { email, driving } = req.body;

    const reqFields = { email };

    validateRequiredFields(res, reqFields);

    if (driving === undefined) {
      driving = false;
    }

    const driverProps = { email, driving };

    Driver.create(driverProps).then((driver) => res.status(201).send(driver));
  },
};
