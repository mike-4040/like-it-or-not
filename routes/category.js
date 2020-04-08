const router = require('express').Router();
const controller = require('../controllers/category');
const { auth } = require('../utils/auth');
const { checkRole } = require('../utils/auth');
const { roles } = require('../config/config');

/** Unprotected */
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

/** The rest routes are protected and requires 'admin' role */
router.post('/', auth, checkRole([roles.admin]), controller.create);
router.delete('/:id', auth, checkRole([roles.admin]), controller.delete);
router.put('/:id', auth, checkRole([roles.admin]), controller.update);

module.exports = router;
