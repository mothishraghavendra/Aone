const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middlewares/authMiddleware');

// GET /api/student/profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Always use username for students
    const rollNumber = req.user?.username;
    console.log('Student profile fetch - rollNumber:', rollNumber);
    if (!rollNumber) {
      console.log('No rollNumber found in token:', req.user);
      return res.status(400).json({ error: 'Roll number not found in token' });
    }

    const [rows] = await db.query('SELECT * FROM students WHERE roll_number = ?', [rollNumber]);
    console.log('DB query result:', rows);
    if (!rows.length) {
      console.log('Student not found for rollNumber:', rollNumber);
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = rows[0];
    // Map DB fields to frontend expected keys
    const profile = {
      fullName: student.full_name,
      photoUrl: student.photo_url,
      admissionNumber: student.admission_number,
      rollNumber: student.roll_number,
      program: student.program,
      degree: student.degree,
      applicationNumber: student.application_number,
      dob: student.dob,
      gender: student.gender,
      bloodGroup: student.blood_group,
      nationality: student.nationality,
      religion: student.religion,
      maritalStatus: student.marital_status,
      casteCategory: student.caste_category,
      caste: student.caste,
      universityRegion: student.university_region,
      admissionCategory: student.admission_category,
      admissionMode: student.admission_mode,
      studentType: student.student_type,
      isLocal: student.is_local,
      status: student.status,
      admittedYear: student.admitted_year,
      admittedSemester: student.admitted_semester,
      currentYear: student.current_year,
      currentSemester: student.current_semester,
      email: student.email,
      studentOfficialEmail: student.student_official_email,
      mobileNumber: student.mobile_number,
      studentWhatsappNumber: student.student_whatsapp_number,
      homeTelephone: student.home_telephone,
      residenceCategory: student.residence_category,
      familyAnnualIncome: student.family_annual_income,
      fatherName: student.father_name,
      motherName: student.mother_name,
      fatherOccupation: student.father_occupation,
      motherOccupation: student.mother_occupation,
      fatherEducationLevel: student.father_education_level,
      motherEducationLevel: student.mother_education_level,
      fatherPrimaryMobile: student.father_primary_mobile,
      fatherSecondaryMobile: student.father_secondary_mobile,
      motherPrimaryMobile: student.mother_primary_mobile,
      motherSecondaryMobile: student.mother_secondary_mobile,
      fatherEmail: student.father_email,
      motherEmail: student.mother_email,
      identificationMark1: student.identification_mark1,
      identificationMark2: student.identification_mark2,
      isPhysicallyChallenged: student.is_physically_challenged,
      isNationalMeritEligible: student.is_national_merit_eligible
    };
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
