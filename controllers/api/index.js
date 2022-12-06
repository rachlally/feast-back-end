const router = require('express').Router();
const storageRoutes = require('./storageController');

router.use('/storage', storageRoutes);


module.exports = router;