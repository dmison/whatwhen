const Mongoose = require('mongoose');
const sessionSchema = require('./db/Session.js');
const locationSchema = require('./db/Location.js');
const presenterSchema = require('./db/Presenter.js');

const config = require('./config.json');

const db = Mongoose.connect(config.db.mongodb.connectionURL);

const Session = Mongoose.model('Session', sessionSchema);
const Location = Mongoose.model('Location', locationSchema);
const Presenter = Mongoose.model('Presenter', presenterSchema);

module.exports = {
  Session: Session,
  Location: Location,
  Presenter: Presenter
};
