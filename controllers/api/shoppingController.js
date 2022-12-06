// const express = require('express');
// const router = express.Router();
// const {User, Kitchen, Storage, Product, DonationList, ShoppingList} = require('../../models');
// const jwt = require('jsonwebtoken');


// //get shoppingList

// router.get('/', (req,res)=>{
//     ShoppingList.findAll({
//         include:[User]
//     }).then(shoppingData=>{
//         res.json(shoppingData)
//     }).catch(err=>{
//         console.log(err);
//         res.json({msg:"an error occured",err})
//     })
// })

// module.exports = router;