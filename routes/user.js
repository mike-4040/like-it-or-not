const router = require('express').Router();
const controller = require('../controllers/user');
const { userUpdate } = require('../utils/validationSchemas');
const validationMiddleware = require('../utils/validationMiddleware');

router.put('/', validationMiddleware(userUpdate), controller.update);
router.get('/:id', controller.findOne);
router.delete('/:id', controller.delete);

module.exports = router;
