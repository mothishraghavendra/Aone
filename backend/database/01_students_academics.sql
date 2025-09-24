-- Database creation
CREATE DATABASE IF NOT EXISTS aone;
USE aone;

-- 1. Student Profile
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Name details
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    full_name VARCHAR(150),
    
    -- Photo
    photo_url VARCHAR(255),
    
    -- Application details
    application_number VARCHAR(50) NOT NULL,
    enquiry_number VARCHAR(50) DEFAULT '0',
    physical_application_number VARCHAR(50),
    application_submitted_date DATETIME,
    
    -- Admission details
    admission_number VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    admission_date DATETIME NOT NULL,
    university_region VARCHAR(100),
    admission_category VARCHAR(50),
    admission_mode VARCHAR(50),
    degree VARCHAR(100) NOT NULL,
    program VARCHAR(100) NOT NULL,
    student_type ENUM('Boarder','Day Scholar') NOT NULL,
    is_local ENUM('Yes','No') DEFAULT 'Yes',
    
    -- Status
    status ENUM('Active','Alumni') DEFAULT 'Active',
    admitted_year VARCHAR(20),
    admitted_semester VARCHAR(20),
    current_year VARCHAR(20),
    current_semester VARCHAR(20),
    
    -- Personal details
    dob DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(10),
    nationality VARCHAR(50),
    religion VARCHAR(50),
    residence_category VARCHAR(50),
    marital_status VARCHAR(20),
    caste_category VARCHAR(50),
    caste VARCHAR(50),
    family_annual_income DECIMAL(10,2),
    identification_mark1 VARCHAR(255),
    identification_mark2 VARCHAR(255),
    is_physically_challenged ENUM('Yes','No') DEFAULT 'No',
    is_national_merit_eligible ENUM('Yes','No') DEFAULT 'No',
    
    -- Contact
    email VARCHAR(100) UNIQUE NOT NULL,
    student_official_email VARCHAR(100),
    mobile_number VARCHAR(15),
    student_whatsapp_number VARCHAR(15),
    home_telephone VARCHAR(20),
    
    -- Parent details
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    father_occupation VARCHAR(100),
    mother_occupation VARCHAR(100),
    father_education_level VARCHAR(100),
    mother_education_level VARCHAR(100),
    father_primary_mobile VARCHAR(15),
    father_secondary_mobile VARCHAR(15),
    mother_primary_mobile VARCHAR(15),
    mother_secondary_mobile VARCHAR(15),
    father_email VARCHAR(100),
    mother_email VARCHAR(100),
    
    -- Authentication (set later via trigger)
    password_hash VARCHAR(255) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Academics
CREATE TABLE timetable (
    timetable_id INT AUTO_INCREMENT PRIMARY KEY,
    hod_id INT NOT NULL,
    program VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    day_of_week ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat') NOT NULL,
    period INT NOT NULL,
    room_no VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE syllabus (
    syllabus_id INT AUTO_INCREMENT PRIMARY KEY,
    program VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Leave') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create indexes for frequently queried columns
CREATE INDEX idx_student_roll ON students(roll_number);
CREATE INDEX idx_student_admission ON students(admission_number);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_timetable_program ON timetable(program, semester);