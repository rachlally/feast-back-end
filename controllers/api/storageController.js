const router = require('express').Router();
const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User,Kitchen, Storage, Product} = require('../../models');

router.get('/', async (req, res) => {
    try {
      const storageData = await Storage.findAll();
      res.status(200).json(storageData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;