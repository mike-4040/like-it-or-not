const router = require('express').Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findOne);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);
router.put('/:id', categoryController.update);

module.exports = router;
