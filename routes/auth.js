const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/user');

const { shortToken } = require('../utils/auth');

router.post('/signin', controller.signin);
router.post('/signup', controller.create);

/** @todo move functions to controller */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  ({ user }, res) => {
    console.log('/google/callback');
    const token = shortToken(user._id);
    return (
      res
        .redirect(`${process.env.FRONT_URL}/auth/${token}`)
    );
  }
);

router.get('/token/:token', controller.exchangeToken);

module.exports = router;
