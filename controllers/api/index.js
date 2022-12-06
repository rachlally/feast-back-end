const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const storageRoutes = require('./storageController');
const productRoutes = require('./productController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/storages', storageRoutes);
router.use('/products', productRoutes);

module.exports = router;