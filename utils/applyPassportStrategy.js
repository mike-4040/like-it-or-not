require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');
const { verifyToken } = require('../utils/auth');

module.exports = passport => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
  };
  passport.use(new Strategy(options, verifyToken));
};
