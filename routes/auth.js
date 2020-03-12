const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/signin', userController.signin);
router.post('/signup', userController.create);

module.exports = router;
