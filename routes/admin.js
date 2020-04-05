const router = require('express').Router();
const controller = require('../controllers/admin');
const { checkRole } = require('../utils/auth');
const { roles} = require('../config/config');

router.get('/', checkRole([roles.admin]), controller.findAllUsers);
router.put('/', controller.updateUser);
// router.get('/:id', controller.findOne);
router.delete('/:id', controller.deleteUser);

module.exports = router;
