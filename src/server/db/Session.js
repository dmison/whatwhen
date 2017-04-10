const Mongoose = require('mongoose');

const Session = Mongoose.Schema({
  title: String,
  summary: String,
  location: { type: Mongoose.Schema.Types.ObjectId, ref: 'Location', required: false},
  presenter: { type: Mongoose.Schema.Types.ObjectId, ref: 'Presenter', required: false}
});


module.exports = Session;
