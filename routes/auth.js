const router = require('express').Router();

const controller = require('../controllers/user');
const { passMiddleGoogle, passMiddleGoogleCB } = require('../utils/auth');

router.post('/signin', controller.signin);
router.post('/signup', controller.create);

/** call google auth */
router.get('/google', passMiddleGoogle);

/** consume google auth callback and return short living token to the frontend */
router.get(
  '/google/callback',
  passMiddleGoogleCB,
  controller.returnShortTocken
);

/** consume short living token from front and issue regular token */
router.get('/token/:token', controller.exchangeToken);

module.exports = router;
