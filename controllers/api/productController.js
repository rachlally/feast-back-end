const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User, Storage, ShoppingList, Product, Kitchen, DonationList} = require('../../models');

// GET all Products
router.get('/', async (req,res)=> {
    try {
        const products = await Product.findAll({
            include: [Storage, ShoppingList, DonationList]
        });
        res.status(200).json(products)
    } catch(err) {
        console.log(err);
        res.json({
            msg: 'an error occurred',
            err
        })
    }
})

// GET a single product based on the id you pass in
router.get('/:id', async (req,res)=> {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [Storage, ShoppingList, DonationList]
        });
        res.status(200).json(product)
    } catch(err) {
        console.log(err);
        res.json({ msg: 'an error occurred', err})
    }
})

// POST a new product, passing in it's model requirements as a JSON object
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create({
            name: req.body.name,
            isPerishable: req.body.isPerishable,
            datePurchased: req.body.datePurchased,
            expirationDate: req.body.expirationDate
        });
        res.status(201).json(newProduct)
    } catch(err) {
        console.log(err);
        res.json({ msg: 'an error occurred', err })
    }
})

// Update an existing product
router.put('/:id', async (req,res) => {
    try {
        const updateProduct = await Product.findByPk(req.params.id);
        Product.update(
            req.body,
            {
                where: {
                    id:req.params.id
                }
            }
        )
        res.status(200).json(updateProduct)
    } catch(err) {
        console.log(err);
        res.json({ mesg: 'an error occurred' })
    }
})

// Delete an existing product
router.delete('/:id', async (req,res) => {
    try {
        const deleteProduct = await Product.findByPk(req.params.id);
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deleteProduct)
    } catch(err) {
        console.log(err);
        res.json({ msg: 'an error occurred' })
    }
})

module.exports = router;