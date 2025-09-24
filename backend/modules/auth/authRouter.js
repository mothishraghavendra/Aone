const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/db');
const config = require('../../config/config');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Get user from database
        const [users] = await db.query(
            'SELECT user_id, username, password_hash, role, is_active FROM users WHERE username = ?',
            [username]
        );

        if (!users.length) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check if user is active
        if (!user.is_active) {
            return res.status(401).json({ error: 'Account is inactive' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login time
        await db.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?',
            [user.user_id]
        );

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.user_id,
                username: user.username,
                role: user.role
            },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        // Return user info and token
        res.json({
            token,
            user: {
                id: user.user_id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        
        // Check if user still exists and is active
        const [users] = await db.query(
            'SELECT user_id, username, role, is_active FROM users WHERE user_id = ?',
            [decoded.userId]
        );

        if (!users.length || !users[0].is_active) {
            return res.status(401).json({ valid: false, error: 'User not found or inactive' });
        }

        res.json({ 
            valid: true, 
            user: {
                id: users[0].user_id,
                username: users[0].username,
                role: users[0].role
            }
        });
    } catch (error) {
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
});

// Register new user endpoint
router.post('/register', async (req, res) => {
    console.log('=== User Registration Request ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);

    try {
        const { username, password, email, role, is_active } = req.body;

        // Validate request
        if (!username || !password || !role) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Username, password, and role are required' });
        }

        // Check if user already exists
        console.log('Checking for existing user with username:', username);
        const [existingUsers] = await db.query(
            'SELECT user_id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsers.length > 0) {
            console.log('User already exists with username:', username);
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        console.log('Inserting new user...');
        const [result] = await db.query(
            'INSERT INTO users (username, password_hash, email, role, is_active) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, email, role, is_active === undefined ? true : is_active]
        );

        console.log('User created successfully:', result);

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        console.error('Error stack:', error.stack);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({
            error: 'Internal server error during registration',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Create initial admin user if it doesn't exist
const initializeAdminUser = async () => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

        const [existingAdmin] = await db.query(
            'SELECT user_id FROM users WHERE username = ? AND role = "admin"',
            [adminUsername]
        );

        if (!existingAdmin.length) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await db.query(
                'INSERT INTO users (username, password_hash, role, is_active) VALUES (?, ?, "admin", true)',
                [adminUsername, hashedPassword]
            );
            console.log('Admin user created successfully');
        }
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
};

// Initialize admin user when the module is loaded
initializeAdminUser();

module.exports = router;