const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const storageRoutes = require('./storageController');
const shoppingRoutes = require('./shoppingController');
const productRoutes = require('./productController');
const donationRoutes = require('./donationController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/storages', storageRoutes);
router.use('/shopping', shoppingRoutes);
router.use('/products', productRoutes);
router.use('/donation', donationRoutes);

module.exports = router;