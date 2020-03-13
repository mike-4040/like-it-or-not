const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

module.exports = router;
