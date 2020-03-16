const router = require('express').Router();
const controller = require('../controllers/category');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;
