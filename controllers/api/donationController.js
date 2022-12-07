const express = require('express');
const router = express.Router();
const {User, Kitchen, Storage, Product, DonationList, ShoppingList} = require('../../models');
const jwt = require('jsonwebtoken');


//get donation list
router.get('/', (req,res)=>{
    DonationList.findAll({
        include:[User, Product]
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
            include: [User, Product]
        });
        res.status(200).json(donation)
    } catch(err) {
        console.log(err);
        res.json({ msg: 'an error occurred', err})
    }
})

//create donation item
router.post('/', async (req, res) => {
    try {
      const donationList = await DonationList.create(req.body);
      res.status(200).json(donationList);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//put donation item
router.put('/:id', async (req, res) => {
    try{
      const donationList = await DonationList.update(req.body,{where:{id:req.params.id}});
      res.status(200).json(donationList)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

//delete donation item
router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try{
      const donationList = await DonationList.destroy({where:{id:req.params.id}});
      res.status(200).json(donationList)
    } catch (err) {
      console.log(err)
    }
  });

module.exports = router;