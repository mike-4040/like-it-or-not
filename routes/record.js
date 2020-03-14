const router = require('express').Router();
const controller = require('../controllers/record');

router.post('/', controller.create);
router.get('/:id', controller.findOne);

module.exports = router;
