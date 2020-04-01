const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { serverrc } = require('../config/config');
const {
  hashPassword,
  checkPassword,
  createToken,
  checkToken,
  shortToken
} = require('../utils/auth');

module.exports = {
  signin: (req, res) => {
    const { email, password } = req.body;
    db.User.findOne({ email })
      .then(user => {
        if (!user)
          res.status(400).json({ code: 1, message: 'Email is not found.' });
        if (checkPassword(password, user.password)) {
          const token = createToken(
            user.id,
            email,
            user.firstName,
            user.lastName
          );
          res.status(200).json({ code: 0, token });
        } else {
          res.status(400).json({ code: 2, message: 'Wrong password.' });
        }
      })
      .catch(err => dbErrors(err, res));
  },

  signup: (req, res) => {
    const user = req.body;

    user.password = hashPassword(user.password);
    console.log(user);
    db.User.create(user)
      .then(dbUser => {
        const token = createToken(
          dbUser.id,
          dbUser.email,
          dbUser.firstName,
          dbUser.lastName
        );
        res.json({ token });
      })
      .catch(err => dbErrors(err, res));
  },

  /** After succesfull social auth issue and pass to the frontend a short living token */
  returnShortTocken: ({ user }, res) =>
    res.redirect(`${serverrc.clientURI}/auth/${shortToken(user._id)}`),

  exchangeToken: (req, res) => {
    const payload = checkToken(req.params.token);
    if (!payload) return res.status(400).send('Wrong token');

    db.User.findById(payload.id)
      .then(user => {
        if (!user) res.status(500).send('Server error at "exchangeToken"');
        const token = createToken(
          user.id,
          user.email,
          user.firstName,
          user.lastName
        );
        res.status(200).send(token);
      })
      .catch(err => dbErrors(err, res));
  }
};
