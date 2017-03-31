const Mongoose = require('mongoose');
const sessionSchema = require('./db/sessionSchema.js');

const config = require('./config.json');

const db = Mongoose.connect(config.db.mongodb.connectionURL);

const Session = Mongoose.model('Session', sessionSchema);

module.exports = {
  Session: Session
};
