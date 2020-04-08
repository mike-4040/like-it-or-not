const router = require('express').Router();

const controller = require('../controllers/auth');
const { passMiddleGoogle, passMiddleGoogleCB } = require('../utils/auth');
const validationMiddleware = require('../utils/validationMiddleware');
const { signIn, signUp } = require('../utils/validationSchemas');

router.post('/signin', validationMiddleware(signIn), controller.signin);
router.post('/signup', validationMiddleware(signUp), controller.signup);

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
