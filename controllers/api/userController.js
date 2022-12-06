const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Storage, ShoppingList, Product, Kitchen, DonationList} = require('../../models');

//get all users
router.get("/",async (req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users)
    } catch(err){
        console.log(err);
        res.json({msg:"an error has occured", err})
    }})

//create user
router.post('/', (req,res)=>{
    User.create(req.body).then(newUser=>{
        const token = jwt.sign({
            id:newUser.id,
            email:newUser.email
        },process.env.JWT_Secret,{
            expiresIn:"2h"
        })
        return res.json({
            token,
            user:newUser
        })
    })
})

module.exports = router;