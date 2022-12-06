const router = require('express').Router();
const userRoutes = require('./userController');
const productRoutes = require('./productController');

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;