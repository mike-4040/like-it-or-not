const router = require('express').Router();

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const recordRoures = require('./record');
const authRotes = require('./auth');
const adminRotes = require('./admin');

const { auth, checkRole } = require('../utils/auth');
const { roles } = require('../config/config');

/** unprotected */
router.use('/api/auth', authRotes);

/** route level authorization */
router.use('/api/category', categoryRoutes); 

/** protected */
router.use('/api/user', auth, userRoutes);
router.use('/api/record', auth, recordRoures);

/** only for admin */
router.use('/api/admin', auth, checkRole([roles.admin]), adminRotes);

module.exports = router;
