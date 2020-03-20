const router = require('express').Router();
const controller = require('../controllers/record');
const { auth } = require('../utils/auth');

router.post('/', auth, controller.create);
router.get('/:id', auth, controller.findOne);
router.put('/', auth, controller.update);
router.delete('/:id', auth, controller.delete);

router.get('/:id/record', controller.findRecordsUser);

module.exports = router;
