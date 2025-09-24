const db = require('../config/db');

exports.applyLeave = async (req, res) => {
  try {
    const { studentId, fromDate, toDate, reason, contactNumber, parentApproval } = req.body;
    
    const query = `
      INSERT INTO hostel_leaves 
      (student_id, from_date, to_date, reason, contact_number, parent_approval, status) 
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;
    
    await db.query(query, [studentId, fromDate, toDate, reason, contactNumber, parentApproval]);
    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeaveHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT 
        id,
        from_date,
        to_date,
        reason,
        status,
        applied_at,
        approved_by,
        approved_at
      FROM hostel_leaves
      WHERE student_id = ?
      ORDER BY applied_at DESC
    `;
    
    const leaveHistory = await db.query(query, [studentId]);
    res.json(leaveHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitComplaint = async (req, res) => {
  try {
    const { studentId, category, description, priority } = req.body;
    
    const query = `
      INSERT INTO hostel_complaints
      (student_id, category, description, priority, status)
      VALUES (?, ?, ?, ?, 'open')
    `;
    
    await db.query(query, [studentId, category, description, priority]);
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT 
        id,
        category,
        description,
        priority,
        status,
        submitted_at,
        resolved_at,
        resolution_comments
      FROM hostel_complaints
      WHERE student_id = ?
      ORDER BY submitted_at DESC
    `;
    
    const complaints = await db.query(query, [studentId]);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT 
        r.room_number,
        r.block,
        r.floor,
        r.capacity,
        r.room_type,
        a.bed_number,
        a.allocated_date
      FROM hostel_rooms r
      JOIN room_allocations a ON r.id = a.room_id
      WHERE a.student_id = ? AND a.status = 'active'
    `;
    
    const [roomDetails] = await db.query(query, [studentId]);
    
    if (!roomDetails) {
      return res.status(404).json({ message: 'No room allocation found' });
    }
    
    res.json(roomDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};