const Mongoose = require('mongoose');

const sessionSchema = Mongoose.Schema({
  _id: String,
  title: String,
  location: String,
  start: String,
  summary: String
  // presenter: Presenter
  // reviews: [Review]
});


module.exports = sessionSchema;
