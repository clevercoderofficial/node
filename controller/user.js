const User = require('../lib/model/user'); // Assuming the model is defined in a file named User.js
require('dotenv').config()

const jwt = require('jsonwebtoken')

// CREATE - POST /users
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const data = await user.save();
        console.log({ data });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
};

// READ - GET /users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// READ - GET /users/:id
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('cart');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching user' });
    }
};

// UPDATE - PUT /users/:id
exports.replaceUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

// UPDATE - PATCH /users/:id
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

// DELETE - DELETE /users/:id
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndDelete({ _id: id }, { new: true });
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};
