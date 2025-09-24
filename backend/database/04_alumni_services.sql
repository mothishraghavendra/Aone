USE aone;

-- 6. Alumni Services
CREATE TABLE alumni_jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    posted_by INT NOT NULL,
    salary_range VARCHAR(100),
    location VARCHAR(100),
    experience_required VARCHAR(50),
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_date_to_apply DATE,
    status ENUM('Active', 'Closed') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES students(student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE alumni_scholarships (
    scholarship_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    eligibility TEXT NOT NULL,
    amount DECIMAL(10,2),
    posted_by INT NOT NULL,
    application_deadline DATE,
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Closed') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES students(student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE alumni_certifications (
    cert_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    posted_by INT NOT NULL,
    certification_link VARCHAR(255),
    duration VARCHAR(50),
    cost DECIMAL(10,2),
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Expired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES students(student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE alumni_training (
    training_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    posted_by INT NOT NULL,
    start_date DATE,
    end_date DATE,
    mode_of_training ENUM('Online', 'Offline', 'Hybrid'),
    max_participants INT,
    registration_deadline DATE,
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Upcoming', 'Ongoing', 'Completed') DEFAULT 'Upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES students(student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create indexes for frequently queried columns
CREATE INDEX idx_jobs_status ON alumni_jobs(status);
CREATE INDEX idx_scholarships_deadline ON alumni_scholarships(application_deadline);
CREATE INDEX idx_training_dates ON alumni_training(start_date, end_date);

-- Create trigger for no_dues check
CREATE TRIGGER before_no_dues_insert
BEFORE INSERT ON no_dues
FOR EACH ROW
BEGIN
    DECLARE pending_payments INT;
    
    SELECT COUNT(*) INTO pending_payments
    FROM payments 
    WHERE student_id = NEW.student_id 
    AND status = 'Pending';
    
    IF pending_payments > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot generate no-dues. Student has pending payments.';
    END IF;
END;