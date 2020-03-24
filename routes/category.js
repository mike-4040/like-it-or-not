const router = require('express').Router();
const controller = require('../controllers/category');
const { auth } = require('../utils/auth');

/** Unprotected */
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
/** The rest routes are protected */
router.post('/', auth, controller.create);
router.delete('/:id', auth, controller.delete);
router.put('/:id', auth, controller.update);

module.exports = router;
