const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const { use } = require('../routes/users');

const usersCollection = mongoose.connection.collection('users');

const userLogin = async (req, res) => {
    console.log(req.body);
    const user = await usersCollection.findOne({email: req.body.email});
    if(user && await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).json(user);
    }
    else {
        res.status(400).json({message: 'Wrong credential'});
    }
};

const getUser = (req, res) => {
    res.render('dashboard', res.user);
};

const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await cryptData(req.body.password)
    });

    try {
        res.status(201).json(await usersCollection.insertOne(user));
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = await cryptData(req.body.password);
    }

    try {
        res.json(await usersCollection.updateOne(res.user, {$set: req.body}));
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        await usersCollection.findOneAndDelete(res.user);
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// User info
const getUserWallet = (req, res) => {
    res.json(res.user.wallet);
};

async function getUserByEmail(req, res, next) {
    let user;
    try {
        user = await usersCollection.findOne({email: req.params.email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user;
    next();
}

async function cryptData(dataToCrypt) {
    const saltNumber = await bcrypt.genSalt(10);
    return await bcrypt.hash(dataToCrypt, saltNumber);
}

module.exports = {
    userLogin,
    getUserByEmail,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserWallet
};
