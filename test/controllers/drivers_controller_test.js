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
});
