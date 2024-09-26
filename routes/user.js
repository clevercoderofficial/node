const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

// MVC for User
router
    .post('/users', userController.createUser)          // Create a new user
    .get('/users', userController.getUsers)             // Get all users
    .get('/users/:id', userController.getUser)          // Get a single user by ID
    .put('/users/:id', userController.replaceUser)      // Replace a user by ID
    .patch('/users/:id', userController.updateUser)     // Update a user by ID
    .delete('/users/:id', userController.deleteUser);   // Delete a user by ID

exports.routes = router;
