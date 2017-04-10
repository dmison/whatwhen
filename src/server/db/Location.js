const Mongoose = require('mongoose');

const locationSchema = Mongoose.Schema({
  name: String,
  description: String,
  timezone: String
});


module.exports = locationSchema;
