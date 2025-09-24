const Joi = require('joi');

// Validation schema for student creation
const studentSchema = Joi.object({
    // Basic Information
    firstName: Joi.string().required().min(2).max(50),
    middleName: Joi.string().allow('').max(50),
    lastName: Joi.string().allow('').max(50),
    photoUrl: Joi.string().allow('').max(255),
    
    // Application Details
    applicationNumber: Joi.string().required().max(50),
    enquiryNumber: Joi.string().allow('').max(50).default('0'),
    physicalApplicationNumber: Joi.string().allow('').max(50),
    applicationSubmittedDate: Joi.date().allow(null),
    admissionNumber: Joi.string().required().max(50),
    rollNumber: Joi.string().required().max(20),
    admissionDate: Joi.date().allow('').allow(null),
    
    // Academic Information
    universityRegion: Joi.string().allow('').max(100),
    admissionCategory: Joi.string().allow('').max(50),
    admissionMode: Joi.string().allow('').max(50),
    degree: Joi.string().required().max(100),
    program: Joi.string().required().max(100),
    studentType: Joi.string().required().valid('Boarder', 'Day Scholar'),
    isLocal: Joi.string().valid('Yes', 'No').default('Yes'),
    status: Joi.string().valid('Active', 'Alumni').default('Active'),
    admittedYear: Joi.string().allow('').max(20),
    admittedSemester: Joi.string().allow('').max(20),
    currentYear: Joi.string().allow('').max(20),
    currentSemester: Joi.string().allow('').max(20),
    
    // Personal Details
    dob: Joi.date().allow(null),
    gender: Joi.string().allow('').max(10),
    bloodGroup: Joi.string().allow('').max(10),
    nationality: Joi.string().allow('').max(50),
    religion: Joi.string().allow('').max(50),
    residenceCategory: Joi.string().allow('').max(50),
    maritalStatus: Joi.string().allow('').max(20),
    casteCategory: Joi.string().allow('').max(50),
    caste: Joi.string().allow('').max(50),
    familyAnnualIncome: Joi.number().allow(null).precision(2),
    identificationMark1: Joi.string().allow('').max(255),
    identificationMark2: Joi.string().allow('').max(255),
    isPhysicallyChallenged: Joi.string().valid('Yes', 'No').default('No'),
    isNationalMeritEligible: Joi.string().valid('Yes', 'No').default('No'),
    
    // Contact Information
    email: Joi.string().required().email().max(100),
    studentOfficialEmail: Joi.string().allow('').email().max(100),
    mobileNumber: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid mobile number'),
    studentWhatsappNumber: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid WhatsApp number'),
    homeTelephone: Joi.string().allow('').max(20),
    
    // Parent Information
    fatherName: Joi.string().allow('').max(100),
    motherName: Joi.string().allow('').max(100),
    fatherOccupation: Joi.string().allow('').max(100),
    motherOccupation: Joi.string().allow('').max(100),
    fatherEducationLevel: Joi.string().allow('').max(100),
    motherEducationLevel: Joi.string().allow('').max(100),
    fatherPrimaryMobile: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid father primary mobile'),
    fatherSecondaryMobile: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid father secondary mobile'),
    motherPrimaryMobile: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid mother primary mobile'),
    motherSecondaryMobile: Joi.string().allow('').pattern(/^\+?[1-9]\d{9,14}$/).message('Invalid mother secondary mobile'),
    fatherEmail: Joi.string().allow('').email().max(100),
    motherEmail: Joi.string().allow('').email().max(100),
    
    // Authentication
    password: Joi.string().required().min(3).max(100)
});

// Validation function for student creation
const validateStudent = (data) => {
    return studentSchema.validate(data, { abortEarly: false });
};

module.exports = {
    validateStudent
};