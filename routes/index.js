const router = require('express').Router();

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const recordRoures = require('./record');
const authRotes = require('./auth');
const adminRotes = require('./admin');
const { auth } = require('../utils/auth');

router.use('/api/user', auth, userRoutes);
/** route level authorization */
router.use('/api/category', categoryRoutes);
router.use('/api/record', auth, recordRoures);
/** unprotected */
router.use('/api/auth', authRotes);
router.use('/api/admin', auth, adminRotes);

module.exports = router;
