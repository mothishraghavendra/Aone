const express = require('express');
const router = express.Router();

// Import routes
const staffManagementRoutes = require('./routes/staffManagementRoutes');
const studentManagementRoutes = require('./routes/studentManagementRoutes');
const academicManagementRoutes = require('./routes/academicManagementRoutes');
const financeManagementRoutes = require('./routes/financeManagementRoutes');
const reportingRoutes = require('./routes/reportingRoutes');

// Use routes
router.use('/staff', staffManagementRoutes);
router.use('/students', studentManagementRoutes);
router.use('/academics', academicManagementRoutes);
router.use('/finance', financeManagementRoutes);
router.use('/reports', reportingRoutes);

module.exports = router;