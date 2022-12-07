const express = require('express');
const router = express.Router();
const {User, Kitchen, Storage, Product, DonationList, ShoppingList} = require('../../models');
const jwt = require('jsonwebtoken');


//get shoppingList

router.get('/', (req,res)=>{
    ShoppingList.findAll({
        include:[User, Product]
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
            include:[User, Product]
        })
        res.status(200).json(shoppingList)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

//Create shopping list
router.post('/', async (req, res) => {
    try{
      const shoppingList = await ShoppingList.create(req.body);
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  //Update List
  router.put('/:id', async (req, res) => {
    try{
      const shoppingList = await ShoppingList.update(req.body,{where:{id:req.params.id}});
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  //delete list
  router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try{
      const shoppingList = await ShoppingList.destroy({where:{id:req.params.id}});
      res.status(200).json(shoppingList)
    } catch (err) {
      console.log(err)
    }
  });

module.exports = router;