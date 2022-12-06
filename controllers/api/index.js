const router = require('express').Router();

const userRoutes = require('./kitchenController');

router.use('/kitchens', userRoutes);

module.exports = router;