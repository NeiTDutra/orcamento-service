const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(

  function(username, password, done) {

    User.findOne({ nome: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username' }); }
      if (user.senha != password) { return done(null, false, { message: 'Incorret password' }); }
      return done(null, user);
    });
  }
));
            
passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
