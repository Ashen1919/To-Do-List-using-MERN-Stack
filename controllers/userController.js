import bcrypt from "bcrypt";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Create a user
export async function signupUser(req, res) {
    try {
        const { email, firstName, lastName, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Hash the password (use async version)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword
        });

        await newUser.save();
        
        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
}

// Get all users
export async function getUsers(req, res) {
    try {
        const userList = await User.find().select('-password'); 
        
        res.status(200).json({
            message: "Users found successfully",
            users: userList
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message
        });
    }
}

// Get one user
export async function findByEmail(req, res) {
    try {
        const email = req.params.email;
        const result = await User.findOne({ email }).select('-password');
        
        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.status(200).json({
            message: "User found",
            user: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve user",
            error: error.message
        });
    }
}

// Login user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const payload = {
            id: user._id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "48h" });

        // Don't send password in response
        const userResponse = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };

        res.status(200).json({
            message: "Successfully logged in",
            user: userResponse,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
}