const express = require('express');
const router = express.Router();
const userRoutes = require('./api/')


//home Route
router.get("/",(req,res)=>{
    res.send("Homepage")
})

//user routes
router.use("/api",userRoutes);

module.exports = router;