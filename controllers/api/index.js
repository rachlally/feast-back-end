const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');
const shoppingRoutes = require('./shoppingController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);
router.use('/shopping', shoppingRoutes);

module.exports = router;