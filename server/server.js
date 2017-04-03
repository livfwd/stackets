require('../env.js')
var db = require('./config/db.js');
var jwt = require('jsonwebtoken');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2');

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate({
      where: {
        name: profile.displayName,
        image: profile.photos[0].value,
        provider: profile.provider,
        facebook_id: profile.id
      }
    })
    .then(function(user, err) {
      return done(err, user);
    })
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GIT_CLIENT_ID,
    clientSecret: process.env.GIT_CLIENT_SECRET,
    callbackURL: "https://codeminder.herokuapp.com/login/github/return",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('github profile..', profile)
    db.User.findOrCreate({
      where: {
        name: profile.displayName,
        image: profile._json.avatar_url,
        provider: profile.provider,
        github_id: profile.id
      }
    })
    .then(function(user, err) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
  secret: 'TopSecretWord',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('client'));

require('./config/routes.js')(app, express);
var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Running on port: " + port);

var closeServer = function() {
  console.log('closed server');
  server.close();
};

module.exports = {
  app: app,
  closeServer: closeServer
};
