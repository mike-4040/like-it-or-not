const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const {roles} = require('../config/config');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
    // required: true
  },
  photo: String,
  providers: [
    {
      providerName: String,
      providerId: String
    }
  ],
  role: {
    type: String,
    default: roles.user}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
