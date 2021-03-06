const router = require('express').Router();
const controller = require('../controllers/record');

router.post('/', controller.create);
router.get('/:id', controller.findOne);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

router.get('/:id/record', controller.findRecordsUser);

module.exports = router;
