const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply for hostel leave
router.post('/leave', authMiddleware.verifyStudent, hostelController.applyLeave);

// Get student's leave history
router.get('/leave/:studentId', authMiddleware.verifyStudent, hostelController.getLeaveHistory);

// Submit hostel complaint
router.post('/complaints', authMiddleware.verifyStudent, hostelController.submitComplaint);

// Get complaints status
router.get('/complaints/:studentId', authMiddleware.verifyStudent, hostelController.getComplaints);

// Get room details
router.get('/room/:studentId', authMiddleware.verifyStudent, hostelController.getRoomDetails);

module.exports = router;