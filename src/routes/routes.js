const DriversController = require('../controllers/driverController');

module.exports = (app) => {
  app.get('/api', DriversController.greeting);
};
