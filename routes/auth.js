const express = require('express');
const authController = require('../controller/auth'); // Adjust the path as necessary
const router = express.Router();

// User authentication routes
router
    .post('/signup', authController.signup)               // Create a new user (Signup)
    .post('/login', authController.login)                 // Login a user  // Delete a user by ID
    .post('/logout', authController.logout)               // Logout (client-side handled)

module.exports = router;
