const passportGoogle = require('passport-google-oauth');
const { verifyCbGoogle } = require('./auth');
const { passportrc } = require('../config/config');

const Strategy = passportGoogle.OAuth2Strategy;

module.exports = passport => {
  const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: passportrc.googleCallbackURL
  };
  passport.use(new Strategy(options, verifyCbGoogle));
};
