const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/', controller.findAll);
router.put('/', controller.update);
router.get('/:id', controller.findOne);
router.delete('/:id', controller.delete);

module.exports = router;
