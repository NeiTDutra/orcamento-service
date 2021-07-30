const passportG = require('passport');
// passport com passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, './config.env')});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passportG.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/users/userloging/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
            
passportG.serializeUser(function(user, done) {
  done(null, user); 
});

passportG.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passportG;
