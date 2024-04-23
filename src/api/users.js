// This file contains the API routes for the User model


/**
 * @api {get} /users Request User information
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.1.0
 * create a new user in mongoDB database using the user details provided by react component CreateUser.js 
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users with a GET request
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get a specific user with a GET request
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

// Submit a user with a POST request
router.post('/', async (req, res) => {
    const user = new User({
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        email: req.body.email,
        abteilung: req.body.abteilung,
        address: req.body.address,
        geburtstag: req.body.geburtstag
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a user with a PUT request
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set: {
                    vorname: req.body.vorname,
                    nachname: req.body.nachname,
                    email: req.body.email,
                    abteilung: req.body.abteilung,
                    address: req.body.address,
                    geburtstag: req.body.geburtstag
                }
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a user with a DELETE request
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;

