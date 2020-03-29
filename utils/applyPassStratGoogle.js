const passportGoogle = require('passport-google-oauth');
const { verifyCbGoogle } = require('./auth');

const Strategy = passportGoogle.OAuth2Strategy;

module.exports = passport => {
  const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL || ''}/api/auth/google/callback`
  };
  passport.use(new Strategy(options, verifyCbGoogle));
};
