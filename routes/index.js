const router = require('express').Router();

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const authRotes = require('./auth');

router.use('/api/user', userRoutes);
router.use('/api/category', categoryRoutes);
router.use('/', authRotes);

module.exports = router;
