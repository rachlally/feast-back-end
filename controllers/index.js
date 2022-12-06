const express = require('express');
const router = express.Router();
const apiRoutes = require('./api')


//home Route
router.get("/",(req,res)=>{
    res.send("Homepage")
})

//user routes
router.use("/api",apiRoutes);

module.exports = router;