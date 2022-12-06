const router = require('express').Router();
const userRoutes = require('./userController');
const storageRoutes = require('./storageController');

router.use('/users', userRoutes);
router.use('/storages', storageRoutes);

module.exports = router;