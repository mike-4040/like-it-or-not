const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);
router.get('/:id/records', controller.userRecords);

module.exports = router;
