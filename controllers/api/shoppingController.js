const express = require('express');
const router = express.Router();
const {User, Kitchen, Storage, Product, DonationList, ShoppingList} = require('../../models');
const jwt = require('jsonwebtoken');


//get shoppingList

router.get('/', (req,res)=>{
    ShoppingList.findAll({
        include:[Kitchen, Product]
    }).then(shoppingData=>{
        res.json(shoppingData)
    }).catch(err=>{
        console.log(err);
        res.json({msg:"an error occured",err})
    })
})

// get shopping list by user id
router.get('/kitchen/:KitchenId', (req,res)=>{
    ShoppingList.findAll({
        where: {
          '$KitchenId$': req.params.KitchenId
        },
        include:[{
          model: Kitchen,
        attributes: [
          'id',
          'name',
          'zipCode'
        ]}, {
          model: Product,
          attributes: [
            'id',
            'name',
            'isPerishable',
            'datePurchased',
            'expirationDate',
            'StorageId',
            'ShoppingListId',
            'DonationListId'
          ]
        }
      ]
    }).then(shoppingData=>{
        res.json(shoppingData)
    }).catch(err=>{
        console.log(err);
        res.json({msg:"an error occured",err})
    })
})

//get one
router.get('/:id', async (req, res) => {
    try{
        const shoppingList = await ShoppingList.findByPk(req.params.id, {
            include:[Kitchen, Product]
        })
        if (!shoppingList) {
          res.status(404).json({ message: "No shopping list found with that ID!" });
          return;
        }
        res.status(200).json(shoppingList)
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: "No shopping list exists at that ID"})
    }
})

//Create shopping list
router.post('/', async (req, res) => {
    try{
      const shoppingList = await ShoppingList.create({
        name:req.body.name,
        KitchenId: req.body.KitchenId
      });
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log(err)
      res.status(400).json({
        msg: "Check that the shopping list you are adding has either a valid user id",
      });
    }
  });

  //Update List
  router.put('/:id', async (req, res) => {
    try{
      const shoppingList = await ShoppingList.update(req.body,{where:{id:req.params.id}});
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log(err)
      res.status(400).json({
        msg: "Check that the shopping list you are editing has either a valid user id",
      });
    }
  });

  //delete list
  router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try{
      const shoppingList = await ShoppingList.destroy({where:{id:req.params.id}});
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log({ msg: "There is no shopping list with that ID" })
    }
  });

module.exports = router;