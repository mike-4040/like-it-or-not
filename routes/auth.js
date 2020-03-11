const router = require('express').Router();
const passport = require('passport');
// const userController = require('../controllers/user');

router.post(
  '/login',
  passport.authenticate(
    'local',
    { session: false },
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
);

module.exports = router;
