const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const { authenticateToken, authorizeRole } = require('../../../middlewares/authMiddleware');

// Get student profile
router.get('/', authenticateToken, authorizeRole('student'), async (req, res) => {
    try {
        // Get authenticated user's ID from token
        const userId = req.user.userId;
        
        // Get student details by matching email with user's username
        const [students] = await db.query(
            `SELECT * FROM students WHERE email = (
                SELECT email FROM users WHERE user_id = ?
            )`,
            [userId]
        );

        if (!students.length) {
            return res.status(404).json({ error: 'Student profile not found' });
        }

        // Format dates
        const student = students[0];
        if (student.dob) {
            student.dob = new Date(student.dob).toISOString().split('T')[0];
        }
        if (student.admissionDate) {
            student.admissionDate = new Date(student.admissionDate).toISOString().split('T')[0];
        }
        if (student.applicationSubmittedDate) {
            student.applicationSubmittedDate = new Date(student.applicationSubmittedDate).toISOString();
        }

        res.json(student);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({
            error: 'Internal server error while fetching student profile'
        });
    }
});

module.exports = router;