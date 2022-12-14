const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Storage, ShoppingList, Product, Kitchen, DonationList} = require('../../models');

//get all storage types
router.get('/', async (req, res) => {
    try {
      const storageData = await Storage.findAll({
        include: [Kitchen, Product]
      });
      res.status(200).json(storageData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get all storages filtered by userId
router.get('/user/:UserId', async (req, res) => {
    try {
      const storageData = await Storage.findAll({
        where: {
          '$Kitchen.UserId$': req.params.UserId
        },
        include: [{
          model: Kitchen,
          attributes:[
            'UserId'
          ]
        }, {
          model: Product,
          attributes:[
            'id',
            'name',
            'isPerishable',
            'datePurchased',
            'expirationDate',
            'ShoppingListId',
            'DonationListId'
          ]
        }]
      });
      res.status(200).json(storageData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get storage type by id
router.get('/:id', async (req, res) => {
    try {
      const storageData = await Storage.findByPk(req.params.id,{
        include: [Kitchen, Product]
      });
      if (!storageData) {
      res.status(404).json({ message: 'No Storage Location found with that ID!' });
      return;
      } 
      res.status(200).json(storageData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get storage by kitchen id
router.get('/kitchens/:id', async (req,res) => {
  try {
    const storageData = await Storage.findAll({
      where: {
        '$Storage.KitchenId$': req.params.id
      },
      include: [Product]
    });
    if (!storageData) {
      res.status(404).json({ message: "No storages found with that kitchen id" });
      return;
    }
    res.status(200).json(storageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create storage type
router.post('/', async (req, res) => {
  try {
    const storageData = await Storage.create({
        storageType: req.body.storageType,
        KitchenId: req.body.KitchenId
    });
    res.status(200).json(storageData);
  } catch (err) {
    res.status(400).json({
      msg: "The storage type you are creating does not have a valid kitchen ID associated with it",
    });
  }
});

//update storage type
router.put('/:id', async (req, res) => {
    try {
        const storageData = await Storage.update({
            storageType: req.body.storageType
        },{
            where: {
            id: req.params.id,
        }
        });
        res.status(200).json(storageData)
    } catch (err) {
        res.status(400).json({msg: "A storage type with that ID does not exist", err});
    }
});

// delete a storage by id
router.delete('/:id', async (req, res) => {
    try {
        const storageData = await Storage.destroy({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(storageData)
    } catch (err) {
        res.status(400).json({ msg: "There is no storage type with that ID" });
    }
  });
  

module.exports = router;