const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middlewares/authMiddleware');

// PATCH /api/student/update-contact
router.patch('/update-contact', authenticateToken, async (req, res) => {
  try {
    const rollNumber = req.user?.username;
    const { email, mobileNumber } = req.body;
    console.log('PATCH /update-contact called');
    console.log('Token user:', req.user);
    console.log('Request body:', req.body);
    if (!rollNumber) return res.status(400).json({ error: 'Roll number not found in token' });
    if (!email && !mobileNumber) return res.status(400).json({ error: 'No email or mobile number provided' });

    // Build dynamic query
    let query = 'UPDATE students SET';
    const params = [];
    if (email) {
      query += ' email = ?';
      params.push(email);
    }
    if (mobileNumber) {
      if (email) query += ',';
      query += ' mobile_number = ?';
      params.push(mobileNumber);
    }
    query += ' WHERE roll_number = ?';
    params.push(rollNumber);

    console.log('Executing query:', query, params);
    const [result] = await db.query(query, params);
    console.log('DB update result:', result);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Contact details updated successfully' });
  } catch (err) {
    console.error('Error updating contact details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
