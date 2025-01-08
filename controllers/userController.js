const User = require('../models/user');
const mongoose = require('mongoose');

const Users = mongoose.connection.collection('Users');

const getUsers = async (req, res) => {
    try {
        const users = await Users.find().toArray();
        res.send(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = (req, res) => {
    res.json(res.user);
};

const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await Users.insertOne(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        await Users.findOneAndDelete(res.user)
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

async function getUserByUsername(req, res, next) {
    let user;
    try {
        user = await Users.findOne({username: req.params.username});
        if (user == null) {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user;
    next();
}

module.exports = {
    getUsers,
    getUserByUsername,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
