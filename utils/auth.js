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
   * @returns {string} JWT
   */
  createToken: id =>
    jwt.sign({ id }, process.env.SERVER_SECRET, {
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
      return jwt.verify(token, process.env.SERVER_SECRET);
    } catch {
      return false;
    }
  },

  verifyToken: (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            role: user.role,
            id: user._id
          });
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  },

  auth: passport.authenticate('jwt', { session: false }),

  /** @param {string[]} roles - an array of roles permitted to access this route */
  checkRole: roles => (req, res, next) => {
    if (roles.includes(req.user.role)) next();
    else
      return res
        .status(403)
        .send(`Sorry, only ${roles.toString()} can do this:)`);
  },

  verifyCbGoogle: async (accessToken, refreshToken, profile, done) => {
    const verifiedEmail =
      profile.emails.find(email => email.verified).value ||
      profile.emails[0].value;

    try {
      const user = await User.findOne({ email: verifiedEmail });
      if (user) {
        if (!user.photo && profile.photos) user.photo = profile.photos[0].value;

        //check if db user has creditential from provider
        const dbCreditIndex = user.providers.findIndex(
          provider => provider.providerName === profile.provider
        );

        if (dbCreditIndex != -1) {
          const dbProviderId = user.providers[dbCreditIndex].providerId;
          if (dbProviderId != profile.id)
            user.providers[dbCreditIndex].providerId = profile.id;
        } else {
          // create a db user creditential from provider
          user.providers.push({
            providerName: profile.provider,
            providerId: profile.id
          });
        }
        await user.save();
        return done(null, { id: user._id });
      } else {
        // create a new user
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: verifiedEmail,
          password: null,
          photo: profile.photos ? profile.photos[0].value : null,
          providers: [
            {
              provider: profile.provider,
              providerId: profile.id
            }
          ]
        };
        const newDbUser = await User.create(newUser);
        if (newDbUser) return done(null, { id: newDbUser._id });
      }
    } catch (err) {
      done(err, false);
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
