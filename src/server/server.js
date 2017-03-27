const express = require('express');
const {graphiqlExpress, graphqlExpress} = require('graphql-server-express');
const bodyParser = require('body-parser');
const {printSchema} = require('graphql/utilities/schemaPrinter');
const schema = require('./schema.js');
const cors = require('cors');

const config = require('./config.json');
const graphQLServer = express();

// ======================================================== authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// we can't use google+ profiles - why are they enforced by the Strategy?
// https://github.com/jaredhanson/passport-google-oauth/issues/46
// GoogleStrategy.prototype.userProfile = function(token, done) {
//   done(null, {})
// }
// #####################################################################
GoogleStrategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://people.googleapis.com//v1/people/me',  accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);

      // var profile = { provider: 'google' };
    //   profile.id           = json.id;
    //   profile.displayName  = json.displayName;
    //   profile.name         = json.name;
    //   if (json.birthday) profile.birthday = json.birthday;
    //   if (json.relationshipStatus) profile.relationship = json.relationshipStatus;
    //   if (json.objectType && json.objectType == 'person') {
    //     profile.isPerson = true;
    //   }
    //   if (json.isPlusUser) profile.isPlusUser = json.isPlusUser;
    //   if (json.placesLived) profile.placesLived = json.placesLived;
    //   if (json.language) profile.language = json.language;
    //   if (json.emails) {
    //     profile.emails = json.emails;
    //
    //     profile.emails.some(function(email) {
    //       if (email.type === 'account') {
    //         profile.email = email.value
    //         return true
    //       }
    //     })
    //   }
    //   if (json.gender) profile.gender = json.gender;
    //   if (json.image && json.image.url) {
    //     var photo = {
    //       value: json.image.url
    //     };
    //     if (json.image.isDefault) photo.type = 'default';
    //     profile.photos = [photo];
    //   }
    //
    //   profile._raw = body;
    //   profile._json = json;
    //
      done(null, json);
    } catch(e) {
      done(e);
    }

  });
};
// #####################################################################

passport.use(new GoogleStrategy({
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackURL,
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done){
  console.log('profile: ',profile);
  return done(null, profile);
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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
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
