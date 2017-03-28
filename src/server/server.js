const express = require('express');
const {graphiqlExpress, graphqlExpress} = require('graphql-server-express');
const bodyParser = require('body-parser');
const {printSchema} = require('graphql/utilities/schemaPrinter');
const schema = require('./schema.js');
const cors = require('cors');
const rawToProfile = require('./rawToProfile.js');

const config = require('./config.json');
const graphQLServer = express();

// ======================================================== authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// #####################################################################

passport.use(new GoogleStrategy({
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackURL,
  passReqToCallback: true,
  userProfileURL: 'https://people.googleapis.com//v1/people/me'
}, function(request, accessToken, refreshToken, profile, done){
  const user = rawToProfile(profile._json);
  if(user.email.endsWith(config.domainLimit)){
    // upsert the user into the database
    return done(null, user);
  } else {
    done("Red Hat Employees only.  Sorry.", null);
  }
}
));

// Express and Passport Session
const session = require('express-session');
graphQLServer.use(session({secret: 'ENTER CUSTOM SESSION SECRET'}));
graphQLServer.use(passport.initialize());
graphQLServer.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user.resourceName);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  console.log(user);
  done(null, user);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

graphQLServer.get('/auth', passport.authenticate('google', { scope : ['profile'] }));
graphQLServer.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

graphQLServer.use('/login', (req,res)=>{
  res.sendFile(__dirname + '/frontend/login.html');
});

graphQLServer.get('/logout', function(req, res) {
  console.log('logging out');
  req.logout();
  res.redirect('/');
});


// ======================================================= assets
graphQLServer.use('/index.js', (req,res)=>{ res.sendFile(__dirname + '/frontend/index.js'); });
// graphQLServer.use('/styles.css', (req,res)=>{ res.sendFile(__dirname + '/frontend/styles.css'); });



// ======================================================= graphql
// https://github.com/graphql/express-graphql/issues/14
graphQLServer.use('/graphql', cors());
graphQLServer.use('/graphql', ensureAuthenticated);

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  context: {}
}));

graphQLServer.use('/graphiql', ensureAuthenticated, graphiqlExpress({
  endpointURL: 'graphql'
}));

graphQLServer.use('/schema', (req,res)=>{
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.use('/', ensureAuthenticated, (req,res)=>{ res.sendFile(__dirname + '/frontend/index.html'); });

graphQLServer.listen(config.port, ()=>{
  console.log('running ... ');
})


// http://stackoverflow.com/questions/4529586/render-basic-html-view

// https://scotch.io/tutorials/easy-node-authentication-google

// http://passportjs.org/docs/overview

// https://github.com/mstade/passport-google-oauth2/blob/master/example/app.js

// https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/
