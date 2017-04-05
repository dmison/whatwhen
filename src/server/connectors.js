const Mongoose = require('mongoose');
const sessionSchema = require('./db/sessionSchema.js');
const locationSchema = require('./db/Location.js');

const config = require('./config.json');

const db = Mongoose.connect(config.db.mongodb.connectionURL);

const Session = Mongoose.model('Session', sessionSchema);
const Location = Mongoose.model('Location', locationSchema);

module.exports = {
  Session: Session,
  Location: Location
};
