const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/db');
const config = require('../../config/config');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        const { username, password, rollNumber, userType } = req.body;
        
        if (!userType) {
            return res.status(400).json({ error: 'User type is required' });
        }
        
        if ((userType !== 'student' && (!username || !password)) || 
            (userType === 'student' && (!rollNumber || !password))) {
            return res.status(400).json({ error: 'Missing required credentials' });
        }

        let user = null;
        let role = null;

        switch (userType) {
            case 'administrator':
                // Check administrator credentials
                console.log('Attempting admin login with:', {
                    providedUsername: username,
                    expectedUsername: config.staff.admin.username,
                    providedPassword: password,
                    expectedPassword: config.staff.admin.password
                });
                
                if (username === config.staff.admin.username && 
                    password === config.staff.admin.password) {
                    user = {
                        id: 'admin',
                        username: config.staff.admin.username,
                        role: 'administrator'
                    };
                    role = 'administrator';
                }
                break;

            case 'principal':
                // Check principal credentials
                if (username === config.staff.principal.username && 
                    password === config.staff.principal.password) {
                    user = {
                        id: 'principal',
                        username: config.staff.principal.username,
                        role: 'principal'
                    };
                    role = 'principal';
                }
                break;

            case 'warden':
                // Check warden credentials
                if (username === config.staff.warden.username && 
                    password === config.staff.warden.password) {
                    user = {
                        id: 'warden',
                        username: config.staff.warden.username,
                        role: 'warden'
                    };
                    role = 'warden';
                }
                break;

            case 'student':
                // Check student credentials
                const [students] = await db.query(
                    'SELECT student_id, roll_number, password_hash, first_name, last_name FROM students WHERE roll_number = ?',
                    [rollNumber]
                );

                if (students.length > 0) {
                    const student = students[0];
                    const validPassword = await bcrypt.compare(password, student.password_hash);

                    if (validPassword) {
                        user = {
                            id: student.student_id,
                            username: student.roll_number,
                            firstName: student.first_name,
                            lastName: student.last_name,
                            role: 'student'
                        };
                        role = 'student';
                    }
                }
                break;

            default:
                return res.status(400).json({ error: 'Invalid user type' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id,
                username: user.username,
                role: role
            },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        // Return user info and token
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: role,
                firstName: user.firstName,
                lastName: user.lastName
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
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
});

module.exports = router;