const Joi = require('joi');

const staffSchema = Joi.object({
    fullName: Joi.string().required().max(100),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    dob: Joi.date().required(),
    maritalStatus: Joi.string().allow('').max(20),
    email: Joi.string().required().email().max(100),
    mobileNumber: Joi.string().required().max(20),
    currentAddress: Joi.string().allow('').max(255),
    permanentAddress: Joi.string().allow('').max(255),
    emergencyContactPerson: Joi.string().allow('').max(100),
    emergencyContactNumber: Joi.string().allow('').max(20),
    department: Joi.string().required().max(100),
    roleDesignation: Joi.string().required().max(100),
    areasOfExpertise: Joi.string().allow('').max(255),
    educationQualifications: Joi.string().allow('').max(1000),
    researchInterests: Joi.string().allow('').max(1000),
    previousExperience: Joi.string().allow('').max(1000),
    publications: Joi.string().allow('').max(1000),
    certifications: Joi.string().allow('').max(1000),
    coursesHandled: Joi.string().allow('').max(1000),
    dateOfJoining: Joi.date().required(),
    employeeId: Joi.string().required().max(50),
    employmentType: Joi.string().valid('Permanent', 'Contract', 'Adhoc', 'Visiting Faculty').required(),
    salaryCtc: Joi.number().allow(null),
    gradePay: Joi.string().allow('').max(20),
    bankAccountDetails: Joi.string().allow('').max(100),
    panNumber: Joi.string().allow('').max(20),
    aadhaarNumber: Joi.string().allow('').max(20),
    photoUrl: Joi.string().allow('').max(255),
    digitalSignatureUrl: Joi.string().allow('').max(255),
    achievementsAwards: Joi.string().allow('').max(1000),
    languagesKnown: Joi.string().allow('').max(100),
    mentoringAvailability: Joi.string().allow('').max(50),
    linkedinProfile: Joi.string().allow('').max(255),
    researchgateProfile: Joi.string().allow('').max(255),
    googleScholarProfile: Joi.string().allow('').max(255),
    specialRoles: Joi.string().allow('').max(255)
});

const validateStaff = (data) => {
    return staffSchema.validate(data, { abortEarly: false });
};

module.exports = {
    validateStaff
};
