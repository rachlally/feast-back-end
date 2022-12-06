const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const storageRoutes = require('./storageController');
const shoppingRoutes = require('./shoppingController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/storages', storageRoutes);
// router.use('/shopping', shoppingRoutes);

module.exports = router;