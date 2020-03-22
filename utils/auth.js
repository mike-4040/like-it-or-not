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
   */
  createToken: (id, email, firstName) =>
    jwt.sign({ id, email, firstName }, process.env.SERVER_SECRET, {
      expiresIn: jwtrc.expiresIn
    }),

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
    console.log('verifyCallbackGoogle', profile);

    try {
      const user = await User.findOne({ profileId: profile.id });
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
  }
};
