require('dotenv').config();
const mongoose = require('mongoose');
const { TEST_DATABASE_CONNECTION } = process.env;

before((done) => {
  mongoose.connect(TEST_DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.once('open', function () {
    console.log('Connected to TEST DB');
    done();
  }).on('error', (error) => {
    console.error('DB Connection error: ', error);
  });
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
