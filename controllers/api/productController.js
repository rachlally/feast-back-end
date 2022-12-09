const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  User,
  Storage,
  ShoppingList,
  Product,
  Kitchen,
  DonationList,
} = require("../../models");

// GET all Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Storage, ShoppingList, DonationList],
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.json({
      msg: "an error occurred",
      err,
    });
  }
});

// GET all Products by KitchenId
router.get("/kitchen/:KitchenId", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        '$KitchenId$': req.params.KitchenId
      },
      include: [{
        model: Storage,
        attributes: [
          'KitchenId',
          'storageType'
        ]
      }, { 
        model: ShoppingList,
        attributes: [
          'name',
          'UserId'
        ]
      }, {
        model: DonationList,
      attributes: [
        'name',
        'UserId'
      ]
    }],
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.json({
      msg: "an error occurred",
      err,
    });
  }
});

// GET a single product based on the id you pass in
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Storage, ShoppingList, DonationList],
    });
    if (!product) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

// POST a new product, passing in it's model requirements as a JSON object
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      isPerishable: req.body.isPerishable,
      datePurchased: req.body.datePurchased,
      expirationDate: req.body.expirationDate,
      StorageId: req.body.StorageId,
      ShoppingListId: req.body.ShoppingListId,
      DonationListId: req.body.DonationListId,
      UserId: req.body.UserId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "Check that the product you are adding has either a valid Storage Id, DonationList Id and/or Shopping List Id",
    });
  }
});

// Update an existing product
router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      include: [Storage, ShoppingList, DonationList],
    });
    if (!updateProduct) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "Check that the product you are adding has either a valid Storage Id, DonationList Id and/or Shopping List Id",
    });
  }
});

// Delete an existing product
router.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "There is no product with that ID" });
  }
});

module.exports = router;
