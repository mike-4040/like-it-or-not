const router = require('express').Router();

const categoryRoutes = require('./category');
const userRoutes = require('./user');

router.use('/api/user', userRoutes);
router.use('/api/category', categoryRoutes);

module.exports = router;
