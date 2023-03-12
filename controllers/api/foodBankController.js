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
const axios = require('axios');

router.get("/", async (req, res) => {
    console.log("req: " + req)
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat}%2C${req.query.lng}&radius=${req.query.radius}&keyword=food%20bank&key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ`
      )
      console.log(req.query.lat)
    // console.log(response.data)
    res.json(response.data) 
  }); 

//   router.get("/", async (req, res) => {
//         console.log("req: " + req)
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6062%2C-122.3321&radius=5000&keyword=food%20bank&key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ`
//     )
//     console.log(response.data)
//     res.json(response.data)
//   });

module.exports = router;