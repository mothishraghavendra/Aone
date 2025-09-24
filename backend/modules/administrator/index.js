const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const { authenticateToken, authorizeRole } = require('../../middlewares/authMiddleware');
const { validateStudent } = require('./validator');

// Create a new student
router.post('/students', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        console.log('Received student creation request:', JSON.stringify(req.body, null, 2));
        const {
            // Basic Information
            firstName, middleName, lastName, photoUrl,
            
            // Application Details
            applicationNumber, enquiryNumber, physicalApplicationNumber,
            applicationSubmittedDate, admissionNumber, rollNumber,
            admissionDate,
            
            // Academic Information
            universityRegion, admissionCategory, admissionMode,
            degree, program, studentType, isLocal, status,
            admittedYear, admittedSemester, currentYear, currentSemester,
            
            // Personal Details
            dob, gender, bloodGroup, nationality, religion,
            residenceCategory, maritalStatus, casteCategory, caste,
            familyAnnualIncome, identificationMark1, identificationMark2,
            isPhysicallyChallenged, isNationalMeritEligible,
            
            // Contact Information
            email, studentOfficialEmail, mobileNumber,
            studentWhatsappNumber, homeTelephone,
            
            // Parent Information
            fatherName, motherName, fatherOccupation, motherOccupation,
            fatherEducationLevel, motherEducationLevel,
            fatherPrimaryMobile, fatherSecondaryMobile,
            motherPrimaryMobile, motherSecondaryMobile,
            fatherEmail, motherEmail,
            
            // Authentication
            password
        } = req.body;

        // Validate student data
        console.log('Validating student data...');
        const { error } = validateStudent(req.body);
        if (error) {
            console.error('Validation error:', error);
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log('Student data validation passed');

        // Check if student already exists with same email or roll number
        console.log('Checking for existing student with email:', email, 'or roll number:', rollNumber);
        
        const [existingStudent] = await db.query(
            'SELECT * FROM students WHERE email = ? OR roll_number = ?',
            [email, rollNumber]
        );

        console.log('Existing student query result:', existingStudent);

        if (existingStudent.length > 0) {
            return res.status(400).json({
                error: 'Student with this email or roll number already exists'
            });
        }

        // Generate a password hash using bcrypt
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Construct full name
        const fullName = [firstName, middleName, lastName]
            .filter(Boolean)
            .join(' ');

        // Insert new student
        console.log('Attempting to insert new student...');
        const [result] = await db.query(
            `INSERT INTO students (
                first_name, middle_name, last_name, full_name, photo_url,
                application_number, enquiry_number, physical_application_number,
                application_submitted_date, admission_number, roll_number,
                admission_date, university_region, admission_category,
                admission_mode, degree, program, student_type, is_local,
                status, admitted_year, admitted_semester, current_year,
                current_semester, dob, gender, blood_group, nationality,
                religion, residence_category, marital_status, caste_category,
                caste, family_annual_income, identification_mark1,
                identification_mark2, is_physically_challenged,
                is_national_merit_eligible, email, student_official_email,
                mobile_number, student_whatsapp_number, home_telephone,
                father_name, mother_name, father_occupation, mother_occupation,
                father_education_level, mother_education_level,
                father_primary_mobile, father_secondary_mobile,
                mother_primary_mobile, mother_secondary_mobile,
                father_email, mother_email, password_hash
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                firstName, middleName || null, lastName || null, fullName, photoUrl || null,
                applicationNumber, enquiryNumber || '0', physicalApplicationNumber || null,
                applicationSubmittedDate || null, admissionNumber, rollNumber,
                admissionDate || new Date().toISOString().split('T')[0], universityRegion || null, admissionCategory || null,
                admissionMode || null, degree, program, studentType, isLocal || 'Yes',
                status || 'Active', admittedYear || null, admittedSemester || null,
                currentYear || null, currentSemester || null, dob || null,
                gender || null, bloodGroup || null, nationality || null,
                religion || null, residenceCategory || null, maritalStatus || null,
                casteCategory || null, caste || null, familyAnnualIncome || null,
                identificationMark1 || null, identificationMark2 || null,
                isPhysicallyChallenged || 'No', isNationalMeritEligible || 'No',
                email, studentOfficialEmail || null, mobileNumber || null,
                studentWhatsappNumber || null, homeTelephone || null,
                fatherName || null, motherName || null, fatherOccupation || null,
                motherOccupation || null, fatherEducationLevel || null,
                motherEducationLevel || null, fatherPrimaryMobile || null,
                fatherSecondaryMobile || null, motherPrimaryMobile || null,
                motherSecondaryMobile || null, fatherEmail || null,
                motherEmail || null, passwordHash
            ]
        );

        res.status(201).json({
            message: 'Student created successfully',
            studentId: result.insertId
        });
    } catch (error) {
        console.error('Error creating student:', error);
        console.error('Error stack:', error.stack);
        if (error.sqlMessage) {
            console.error('SQL error:', error.sqlMessage);
        }
        res.status(500).json({
            error: 'Internal server error while creating student',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get all students
router.get('/students', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const [students] = await db.query(
            `SELECT 
                student_id,
                first_name,
                middle_name,
                last_name,
                full_name,
                application_number,
                admission_number,
                roll_number,
                admission_date,
                university_region,
                admission_category,
                admission_mode,
                degree,
                program,
                student_type,
                status,
                admitted_year,
                admitted_semester,
                current_year,
                current_semester,
                email,
                mobile_number,
                created_at,
                updated_at
            FROM students
            ORDER BY created_at DESC`
        );

        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            error: 'Internal server error while fetching students'
        });
    }
});

module.exports = router;