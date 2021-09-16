const passportF = require('passport');
// passport com passport-facebook
var FacebookStrategy = require('passport-facebook');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, './config.env') });

const UserSocial = require('../models/userSocial');

passportF.use(new FacebookStrategy({

    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.URI_CALLBACK_FACEBOOK
    },
    function(accessToken, refreshToken, profile, done) {

        let fId = profile.id;
        let fName = profile.displayName;
    
        UserSocial.findOne({ id: fId }, function(err, user) {

            if(err) { return done('Erro:', err); }
            if(!user) { 

                new UserSocial({
                  id: fId,
                  nome: fName,
                  status: 'facebook'
                }).save();

                return done(null, user); 
            }

            console.log(user);
            return done(null, user);
        });
    }
));

passportF.serializeUser(function (user, done) {
    done(null, user);
});

passportF.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passportF;
