const express = require('express');
const router = express.Router();

// Import routes
const academicRoutes = require('./routes/academicRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const examRoutes = require('./routes/examRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Use routes
router.use('/academics', academicRoutes);
router.use('/hostel', hostelRoutes);
router.use('/exams', examRoutes);
router.use('/payments', paymentRoutes);
router.use('/profile', profileRoutes);

module.exports = router;