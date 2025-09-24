const jwt = require('jsonwebtoken');
const db = require('../config/db');
const config = require('../config/config');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, config.jwt.secret);
        
        // Verify user exists and is active
        const [users] = await db.query(
            'SELECT user_id, username, role, is_active FROM users WHERE user_id = ?',
            [decoded.userId]
        );

        if (!users.length || !users[0].is_active) {
            return res.status(401).json({ error: 'User not found or inactive.' });
        }

        // Add user info to request
        req.user = {
            ...decoded,
            isActive: users[0].is_active
        };
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access forbidden. Insufficient privileges.' });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};