const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

// express, mocha, and mongoose don't jive well in a test env
// so we need to access the model this way
// otherwise, the driver model is requested multiple times and
// an error will occur
const Driver = mongoose.model('Driver');

describe('Driers controller', () => {
  it('POST to /api/drivers creates a new driver', (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.countDocuments().then((newCount) => {
            // console.log(newCount);
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/:id edits an existing driver', (done) => {
    const driver = new Driver({ email: 'test@test.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ email: 'updated@test.com', driving: true })
        .end(() => {
          Driver.findOne({ _id: driver._id }).then((updatedDriver) => {
            assert(updatedDriver.email === 'updated@test.com');
            assert(updatedDriver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to /api/drivers/:id removes an existing driver', (done) => {
    const driver = new Driver({ email: 'test@test.com' });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ _id: driver._id }).then((response) => {
            assert(response === null);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628],
      },
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791],
      },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          console.log(response.body[0]);
          assert(response.body.length === 1);
          assert(response.body[0].email === 'miami@test.com');
          done();
        });
    });
  });
});
