const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, ShoppingList, Kitchen, DonationList } = require('../../models');

//get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            include: [ShoppingList]
        });
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.json({ msg: "an error has occured", err })
    }
})

//create user
router.post('/', (req, res) => {
    User.create(req.body).then(newUser => {
        const token = jwt.sign({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        })
        return res.json({
            token,
            user: newUser
        })
    })
})

//get user by token
router.get("/getuserfromtoken", (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        res.json({ user: userData })
    } catch (error) {
        res.status(500).json({ user: false })
    }
})

//get user by id
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        include: [ShoppingList, Kitchen, DonationList]
    }).then(userData => {
        res.json(userData)
    }).catch(err => {
        console.log(err);
        res.json({ msg: "An error has Occured" }, err)
    })
})

//update user by id
router.put('/:id', (req, res) => {
    User.update(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then((updatedUser) => {
        if (updatedUser[0] === 0) {
            return res.status(404).json({ err });
        }
        res.json(updatedUser);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
    });
})


//user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(401).json({ msg: "invalid login credentials" })
        } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json({ msg: "invalid login credentials" })
        } else {
            const token = jwt.sign({
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            }, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })
            return res.json({
                token,
                user: foundUser
            })
        }
    })
})


module.exports = router;