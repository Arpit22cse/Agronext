const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const user=require("../utils/zod");

const router = express.Router();

// MongoDB User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Signin Route
router.post('/', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate user input using zod
        const validationResult = user.safeParse({ username, email, password, role });

        if (!validationResult.success) {
            //console.log(validationResult.error.errors);
            return res.status(400).send(validationResult.error.errors);
        }

        // Create new user
        const newUser = new User({
            username,
            role,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({
            msg:'User created successfully',
            status:200,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;