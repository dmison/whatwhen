const Mongoose = require('mongoose');

const locationSchema = Mongoose.Schema({
  name: String,
  description: String
});


module.exports = locationSchema;
