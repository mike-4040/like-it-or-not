const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { serverrc, roles } = require('../config/config');
const {
  hashPassword,
  checkPassword,
  createToken,
  checkToken,
  shortToken
} = require('../utils/auth');

module.exports = {
  signin: ({ body: { email, password } }, res) => {
    db.User.findOne({ email })
      .then(user => {
        if (!user) res.json({ errmsg: 'Email is not found.' });
        if (checkPassword(password, user.password)) {
          const token = createToken(user._id);
          res.json({ token });
        } else res.json({ errmsg: 'Wrong password' });
      })
      .catch(err => dbErrors(err, res));
  },

  signup: ({ body: user }, res) => {
    user.password = hashPassword(user.password);
    user.role = roles.user;
    db.User.create(user)
      .then(dbUser => {
        const token = createToken(dbUser._id);
        res.json({ token });
      })
      .catch(err => dbErrors(err, res));
  },

  /** After succesfull social auth issue and pass to the frontend a short living token */
  returnShortTocken: ({ user }, res) =>
    res.redirect(`${serverrc.clientURI}/auth/${shortToken(user.id)}`),

  exchangeToken: (req, res) => {
    const payload = checkToken(req.params.token);
    console.log('ex token', payload);
    if (!payload) return res.json({ errmsg: 'Wrong token' });


    db.User.findById(payload.id)
      .then(user => {
        if (!user)
        return res.json({ errmsg: 'Server error at "exchangeToken"' });
        const token = createToken(user._id);
        
        console.log('ex tocken, token: ', token)
        return res.json({ token });
      })
      .catch(err => dbErrors(err, res));
  }
};
