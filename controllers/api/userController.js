const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Kitchen } = require("../../models");

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Kitchen],
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "an error has occured", err });
  }
});

//create user
router.post("/", async (req, res) => {
  try{
    const newUser = await User.create(req.body)
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
      );
      console.log("-------------------")
      console.log(newUser)
      res.status(200).json({
        token,
        user: newUser
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "User with this info already exists", err });
    }
});

//get user by token
router.get("/getuserfromtoken", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: userData });
  } catch (error) {
    res.status(400).json({ user: false });
  }
});

//get user by id

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [Kitchen],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that ID!' });
        return;
        } 
      res.status(200).json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({err});
    });
});

//update user by id
router.put("/:id", (req, res) => {
  User.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedUser) => {
      if (updatedUser[0] === 0) {
        return res.status(404).json({ err });
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "A user with that ID does not exist"});
    });
});

//user login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((foundUser) => {
    if (!foundUser) {
      return res.status(401).json({ msg: "invalid login credentials" });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "invalid login credentials" });
    } else {
      const token = jwt.sign(
        {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      return res.json({
        token,
        user: foundUser,
      });
    }
  });
});

//we do not have a delete route

module.exports = router;
