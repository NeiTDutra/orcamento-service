const passportG = require('passport');
// passport com passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, './config.env') });

const User = require('../models/user');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passportG.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/users/userloging/callback"
},
  function (accessToken, refreshToken, profile, done) {

    let gName = profile._json.name;

    User.findOne({ nome: gName }, function (err, user) {
      if(err) { return done('Erro:', err); }
      if(!user) { return done(null, false, { message: 'Incorrect username' }); }
      return done(null, user);
    });
  }
));

passportG.serializeUser(function (user, done) {
  done(null, user);
});

passportG.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passportG;
