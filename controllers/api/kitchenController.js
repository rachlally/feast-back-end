const router = require('express').Router();

const { Kitchen } = require('../../models');

//get all kitchens
router.get("/",(req,res)=>{
    Kitchen.findAll().then(kitchenData=>{
        res.json(kitchenData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})
//get one kitchen





module.exports = router;