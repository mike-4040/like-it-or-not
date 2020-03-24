const router = require('express').Router();

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const recordRoures = require('./record');
const authRotes = require('./auth');
const { auth } =require('../utils/auth');

router.use('/api/user', auth, userRoutes);
router.use('/api/category', auth, categoryRoutes);
router.use('/api/record', auth, recordRoures);
router.use('/api/auth', authRotes);

module.exports = router;
