const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/user');

const { createToken } = require('../utils/auth');

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
    const token = createToken(user.id, user.email, user.firstName);
    return res
      // .status(200)
      // .json({ code: 0, token });
      /** @todo implement redirect somehow */
      .redirect('/main');
  }
);

module.exports = router;
