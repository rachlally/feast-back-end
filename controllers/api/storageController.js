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

//create storage type
router.post('/', async (req, res) => {
  try {
    const storageData = await Storage.create({
        storageType: req.body.storageType,
    });
    res.status(200).json(storageData);
  } catch (err) {
    res.status(400).json(err);
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
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const storageData = await Storage.destroy({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(storageData)
    } catch (err) {
        res.status(400).json(err);
    }
  });
  

module.exports = router;