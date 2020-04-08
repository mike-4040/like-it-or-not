const router = require('express').Router();
const controller = require('../controllers/admin');

router.get('/', controller.findAllUsers);
router.put('/', controller.updateUser);
// router.get('/:id', controller.findOne);
router.delete('/:id', controller.deleteUser);

module.exports = router;
