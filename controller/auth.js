const User = require('../lib/model/user'); // Assuming the User model is in models/User.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')

const privatekey = fs.readFileSync(path.resolve(__dirname, '../private.key'), 'utf-8')
const publickey = fs.readFileSync(path.resolve(__dirname, '../public.key'), 'utf-8')

// CREATE a new User (Signup)
exports.signup = async (req, res) => {
    try {
        const { id, name, email, password, age, gender, address, phone } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new User
        const newUser = new User({
            id,
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            address,
            phone
        });

        // generate token and verify with email
        const token = jwt.sign(
            {
                _id: newUser._id,
                email: newUser.email
            },
            privatekey,
            { algorithm: 'RS256' }
        );

        newUser.token = token

        // Save the User to the database
        await newUser.save();

        res.set("Authorization", `Bearer ${token}`);
        res.status(201).json({ message: "signup successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during signup' });
    }
};

// LOGIN a User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find User by email
        const ExistingUser = await User.findOne({ email });
        if (!ExistingUser) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, ExistingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }


        const token = ExistingUser.token

        const decoded = jwt.verify(token, publickey, { algorithm: 'RS256' });
        const newtoken = jwt.sign(
            {
                _id: decoded._id,
                email: decoded.email
            },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }

        );

        res.set("Authorization", `Bearer ${newtoken}`);
        res.status(201).json({ message: "login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

// 
exports.logout = async (req, res) => {
    try {
        res.set("Authorization", "");
        // Send a success message
        res.status(200).json({ message: "Logout successful, token removed" });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};


// Middleware to verify JWT token for protected routes
exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization'); // Get Authorization header

        // Check if the Authorization header exists
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // Ensure the token follows the 'Bearer <token>' format
        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing or malformed" });
        }

        // Verify the token
        const decoded = jwt.verify(token, publickey, {algorithms: 'RS256'});

        // Store decoded user information in the request
        req._id = decoded._id;  // Store User ID in request object
        req.email = decoded.email;

        // Proceed to the next middleware if everything is valid
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized or invalid token" });
    }
};
