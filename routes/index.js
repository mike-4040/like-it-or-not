const router = require('express').Router();
const userRoutes = require('./user');

router.use('/api/user', userRoutes);

module.exports = router;
