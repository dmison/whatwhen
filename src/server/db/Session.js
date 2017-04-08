const Mongoose = require('mongoose');
const Location = require('./Location.js');

const Session = Mongoose.Schema({
  title: String,
  summary: String,
  location: { type: Mongoose.Schema.Types.ObjectId, ref: 'Location', required: false}
});


module.exports = Session;
