const db = require('../config/db');

exports.getTimeTable = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT 
        t.day,
        t.period,
        t.start_time,
        t.end_time,
        s.subject_name,
        CONCAT(f.first_name, ' ', f.last_name) as teacher_name,
        c.room_number
      FROM timetable t
      JOIN subjects s ON t.subject_id = s.id
      JOIN faculty f ON t.faculty_id = f.id
      JOIN classrooms c ON t.classroom_id = c.id
      WHERE t.class_id = (SELECT class_id FROM students WHERE id = ?)
      ORDER BY t.day, t.period
    `;
    
    const timetable = await db.query(query, [studentId]);
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT 
        s.subject_name,
        COUNT(a.id) as total_classes,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as classes_attended
      FROM attendance a
      JOIN subjects s ON a.subject_id = s.id
      WHERE a.student_id = ?
      GROUP BY s.id, s.subject_name
    `;
    
    const attendance = await db.query(query, [studentId]);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSyllabus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const query = `
      SELECT 
        s.unit_number,
        s.title,
        s.description,
        s.learning_objectives,
        s.resources
      FROM syllabus s
      WHERE s.course_id = ?
      ORDER BY s.unit_number
    `;
    
    const syllabus = await db.query(query, [courseId]);
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};