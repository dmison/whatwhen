const Mongoose = require('mongoose');

const presenterSchema = Mongoose.Schema({
  name: String,
  email: String,
  bio: String
});


module.exports = presenterSchema;
