const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const productRoutes = require('./productController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/products', productRoutes);

module.exports = router;