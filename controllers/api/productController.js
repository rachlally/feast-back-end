const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Storage, Product } = require('../../models');

router.get('/', async (req,res)=> {
    try {
        const product = await Product.findAll();
        res.json(productData);
    } catch(err) {
        console.log(err);
        res.json({
            msg: 'an error occurred',
            err
        })
    }
})