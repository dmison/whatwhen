const Mongoose = require('mongoose');

const locationSchema = Mongoose.Schema({
  _id: String,
  name: String,
  description: String
});


module.exports = locationSchema;
