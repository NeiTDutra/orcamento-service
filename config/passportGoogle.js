const passportG = require('passport');
// passport com passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, './config.env') });

const UserSocial = require('../models/userSocial');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passportG.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.DEV_URI_CALLBACK
},
  function (accessToken, refreshToken, profile, done) {

    let gId = profile._json.sub;
    let gName = profile._json.name;

    UserSocial.findOne({ id: gId }, function (err, user) {

      if(err) { return done('Erro:', err); }
      if(!user) { 

        new UserSocial({
          id: gId,
          nome: gName,
          status: 'google'
        }).save();

        return done(null, user); 
      }

      console.log(user);
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
