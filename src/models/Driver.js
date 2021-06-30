const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  driving: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Driver', DriverSchema);
