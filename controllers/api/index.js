const router = require('express').Router();
const userRoutes = require('./userController');
const kitchenRoutes = require('./kitchenController');

router.use('/users', userRoutes);
router.use('/kitchens', kitchenRoutes);

module.exports = router;