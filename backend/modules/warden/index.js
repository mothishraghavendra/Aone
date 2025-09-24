const express = require('express');
const router = express.Router();

// Import routes
const leaveManagementRoutes = require('./routes/leaveManagementRoutes');
const roomAllocationRoutes = require('./routes/roomAllocationRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');
const messManagementRoutes = require('./routes/messManagementRoutes');

// Use routes
router.use('/leave-management', leaveManagementRoutes);
router.use('/room-allocation', roomAllocationRoutes);
router.use('/complaints', complaintsRoutes);
router.use('/mess-management', messManagementRoutes);

module.exports = router;