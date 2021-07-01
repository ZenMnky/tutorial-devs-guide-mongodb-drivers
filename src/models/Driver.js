const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: { type: [Number], index: '2dsphere' },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: PointSchema,
});

module.exports = mongoose.model('Driver', DriverSchema);
