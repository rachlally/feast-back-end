const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const storageRoutes = require('./storageController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/storages', storageRoutes);

module.exports = router;