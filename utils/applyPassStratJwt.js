const { Strategy, ExtractJwt } = require('passport-jwt');
const { verifyToken } = require('./auth');

module.exports = passport => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SERVER_SECRET
  };
  passport.use(new Strategy(options, verifyToken));
};
