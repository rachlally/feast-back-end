const express = require('express');
const router = express.Router();
const {User, Kitchen, Storage, Product, DonationList, ShoppingList} = require('../../models');
const jwt = require('jsonwebtoken');


//get donation list
router.get('/', (req,res)=>{
    DonationList.findAll({
        include:[Kitchen, Product]
    }).then(donationData=>{
        res.json(donationData)
    }).catch(err=>{
        console.log(err);
        res.json({msg:"an error occured",err})
    })
})

//get donation list by kitchenId
router.get('/kitchen/:KitchenId', (req,res)=>{
    DonationList.findAll({
      where: {
        '$KitchenId$': req.params.KitchenId
      },
      include:[{
        model: Kitchen,
        attributes: [
          'id',
          'name',
          'zipCode'
        ]
      }, {
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
      }]
    }).then(donationData=>{
        res.json(donationData)
    }).catch(err=>{
        console.log(err);
        res.json({msg:"an error occured",err})
    })
})

//donation by id
router.get('/:id', async (req,res)=> {
    try {
        const donation = await DonationList.findByPk(req.params.id, {
            include: [Kitchen, Product]
        });
        if (!donation) {
          res.status(404).json({ message: "No donation list found with that ID!" });
          return;
        }
        res.status(200).json(donation)
    } catch(err) {
        console.log(err);
        res.json({msg: "No donation list exists at that ID"})
    }
})

//create donation item
router.post('/', async (req, res) => {
    try {
      const donationList = await DonationList.create(req.body);
      res.status(200).json(donationList);
    } catch (err) {
      res.status(400).json({
        msg: "Check that the donation list you are adding has either a valid user id",
      });
    }
  });

//put donation item
router.put('/:id', async (req, res) => {
    try{
      const donationList = await DonationList.update(req.body,{where:{id:req.params.id}});
      res.status(200).json(donationList)
    } catch (err) {
      console.log(err)
      res.status(400).json({
        msg: "Check that the donation list you are editing has either a valid user id",
      });
    }
  });

//delete donation item
router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try{
      const donationList = await DonationList.destroy({where:{id:req.params.id}});
      res.status(200).json(donationList)
    } catch (err) {
      console.log({ msg: "There is no donation list with that ID" })
    }
  });

module.exports = router;