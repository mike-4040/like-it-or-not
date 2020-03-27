const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
const { jwtrc } = require('../config/config');

module.exports = {
  /**
   * Hash plain password
   * @param {string} password
   * @returns {string} hashed password
   * @todo change to async
   */
  hashPassword: password =>
    bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS)),

  /**
   * Check password agains hashed password
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {boolean}
   * @todo change to sync
   */
  checkPassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),

  /** Create JWT Tocken
   * @param {string} id
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   *
   * @todo Refactor to consume one object
   */
  createToken: (id, email, firstName, lastName) =>
    jwt.sign({ id, email, firstName, lastName }, process.env.SERVER_SECRET, {
      expiresIn: jwtrc.expiresIn
    }),

  /** Create a short living JWT  */
  shortToken: id =>
    jwt.sign({ id }, process.env.SERVER_SECRET, {
      expiresIn: 10
    }),

  /** Verify Token
   * @param {string} token
   * @returns {Object|boolean} payload if token is valid or false if not
   */
  checkToken: token => {
    try {
      const payload = jwt.verify(token, process.env.SERVER_SECRET);
      return payload;
    } catch {
      return false;
    }
  },

  verifyToken: (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            email: user.email,
            _id: user._id
          });
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  },

  auth: passport.authenticate('jwt', { session: false }),

  verifyCbGoogle: async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('verifyCDGgoogle', profile);
      const user = await User.findOne({ providerId: profile.id });
      if (user) return done(null, { email: user.email, _id: user._id });
    } catch (err) {
      return done(err, false);
    }
    const verifiedEmail =
      profile.emails.find(email => email.verified) || profile.emails[0];

    const newUser = {
      provider: profile.provider,
      providerId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: verifiedEmail.value,
      password: null
    };

    try {
      const user = await User.create(newUser);
      if (user) return done(null, { email: user.email, _id: user._id });
    } catch (err) {
      return done(err, false);
    }
  },

  passMiddleGoogle: passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  }),

  passMiddleGoogleCB: passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  })
};
