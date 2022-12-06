const router = require('express').Router();
const userRoutes = require('./userController');

router.use('/users', userRoutes);

module.exports = router;