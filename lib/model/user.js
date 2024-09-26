const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },                       // Unique ID for the user
    name: { type: String, required: true },                     // Name of the user
    email: { type: String, required: true, unique: true },      // User's email (must be unique)
    password: { type: String, required: true },                 // User's password (hashed)
    age: { type: Number, min: [18, 'Must be at least 18'], max: [120, 'Age too high'] },  // Age validation
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },// Gender (limited to specific values)
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true }
    },                                                          // Address with street, city, and zip code
    phone: { type: String, required: true },                    // User's phone number
    createdAt: { type: Date, default: Date.now },                // Timestamp for when the user was created
    token: String
});

const User = mongoose.model('User', userSchema); // Model
module.exports = User;