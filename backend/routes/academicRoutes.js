const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get student's timetable
router.get('/timetable/:studentId', authMiddleware.verifyStudent, academicController.getTimeTable);

// Get student's attendance
router.get('/attendance/:studentId', authMiddleware.verifyStudent, academicController.getAttendance);

// Get syllabus and curriculum
router.get('/syllabus/:courseId', authMiddleware.verifyStudent, academicController.getSyllabus);

module.exports = router;