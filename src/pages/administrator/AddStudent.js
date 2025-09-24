import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  IconButton,
} from '@mui/material';
import { Save, PersonAdd, CloudUpload, Delete } from '@mui/icons-material';
import axios from 'axios';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const AddStudent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Information', 'Academic Details', 'Contact Details', 'Family Information', 'Additional Details'];

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    middleName: '',
    lastName: '',
    photoUrl: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    maritalStatus: '',
    castCategory: '',
    caste: '',
    identificationMark1: '',
    identificationMark2: '',
    isPhysicallyChallenged: 'No',
    isNationalMeritEligible: 'No',

    // Academic Details
    applicationNumber: '',
    enquiryNumber: '',
    physicalApplicationNumber: '',
    applicationSubmittedDate: '',
    admissionNumber: '',
    rollNumber: '',
    admissionDate: '',
    universityRegion: '',
    admissionCategory: '',
    admissionMode: '',
    degree: '',
    program: '',
    studentType: 'Day Scholar',
    isLocal: 'Yes',
    status: 'Active',
    admittedYear: '',
    admittedSemester: '',
    currentYear: '',
    currentSemester: '',

    // Contact Details
    email: '',
    studentOfficialEmail: '',
    mobileNumber: '',
    studentWhatsappNumber: '',
    homeTelephone: '',
    residenceCategory: '',

    // Family Information
    familyAnnualIncome: '',
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    fatherEducationLevel: '',
    motherEducationLevel: '',
    fatherPrimaryMobile: '',
    fatherSecondaryMobile: '',
    motherPrimaryMobile: '',
    motherSecondaryMobile: '',
    fatherEmail: '',
    motherEmail: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleImageUpload = async () => {
    setUploading(true);
    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          maxFiles: 1,
          maxFileSize: 5000000, // 5MB
          sources: ['local', 'camera'],
          styles: {
            palette: {
              window: '#FFFFFF',
              windowBorder: '#90A0B3',
              tabIcon: '#0078FF',
              menuIcons: '#5A616A',
              textDark: '#000000',
              textLight: '#FFFFFF',
              link: '#0078FF',
              action: '#FF620C',
              inactiveTabIcon: '#0E2F5A',
              error: '#F44235',
              inProgress: '#0078FF',
              complete: '#20B832',
              sourceBg: '#E4EBF1'
            }
          }
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            setFormData(prev => ({ ...prev, photoUrl: result.info.secure_url }));
          }
          if (error) {
            console.error('Cloudinary upload error:', error);
            alert('Failed to upload image. Please try again.');
          }
          setUploading(false);
        }
      );
      widget.open();
    } catch (error) {
      console.error('Error initializing upload widget:', error);
      setUploading(false);
      alert('Failed to initialize image upload. Please try again.');
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, photoUrl: '' }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get auth token
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // First create a user record with roll number as password
      const userData = {
        username: formData.rollNumber,
        password: formData.rollNumber, // Will be hashed on server side
        role: 'student',
        email: formData.email,
        is_active: true
      };

      console.log('Sending user creation request with data:', userData);
      
      // Send request to create user
      const userResponse = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      console.log('User registration response:', userResponse.data);

      if (!userResponse.data || !userResponse.data.userId) {
        console.error('User creation error: Invalid response format');
        throw new Error('Failed to create user account: Invalid response format');
      }

      // Then create the student record with properly matched field names
      const studentData = {
        firstName: formData.firstName,
        middleName: formData.middleName || null,
        lastName: formData.lastName || null,
        photoUrl: formData.photoUrl || null,
        
        // Use current date if admission date is empty
        admissionDate: formData.admissionDate || new Date().toISOString().split('T')[0],

        applicationNumber: formData.applicationNumber,
        enquiryNumber: formData.enquiryNumber || '0',
        physicalApplicationNumber: formData.physicalApplicationNumber || null,
        applicationSubmittedDate: formData.applicationSubmittedDate || null,
        admissionNumber: formData.admissionNumber,
        rollNumber: formData.rollNumber,
        admissionDate: formData.admissionDate,

        universityRegion: formData.universityRegion || null,
        admissionCategory: formData.admissionCategory || null,
        admissionMode: formData.admissionMode || null,
        degree: formData.degree,
        program: formData.program,
        studentType: formData.studentType,
        isLocal: formData.isLocal,
        status: formData.status,
        admittedYear: formData.admittedYear || null,
        admittedSemester: formData.admittedSemester || null,
        currentYear: formData.currentYear || null,
        currentSemester: formData.currentSemester || null,

        dob: formData.dob || null,
        gender: formData.gender || null,
        bloodGroup: formData.bloodGroup || null,
        nationality: formData.nationality || null,
        religion: formData.religion || null,
        residenceCategory: formData.residenceCategory || null,
        maritalStatus: formData.maritalStatus || null,
        casteCategory: formData.castCategory || null,
        caste: formData.caste || null,
        familyAnnualIncome: formData.familyAnnualIncome || null,
        identificationMark1: formData.identificationMark1 || null,
        identificationMark2: formData.identificationMark2 || null,
        isPhysicallyChallenged: formData.isPhysicallyChallenged,
        isNationalMeritEligible: formData.isNationalMeritEligible,

        email: formData.email,
        studentOfficialEmail: formData.studentOfficialEmail || null,
        mobileNumber: formData.mobileNumber || null,
        studentWhatsappNumber: formData.studentWhatsappNumber || null,
        homeTelephone: formData.homeTelephone || null,

        fatherName: formData.fatherName || null,
        motherName: formData.motherName || null,
        fatherOccupation: formData.fatherOccupation || null,
        motherOccupation: formData.motherOccupation || null,
        fatherEducationLevel: formData.fatherEducationLevel || null,
        motherEducationLevel: formData.motherEducationLevel || null,
        fatherPrimaryMobile: formData.fatherPrimaryMobile || null,
        fatherSecondaryMobile: formData.fatherSecondaryMobile || null,
        motherPrimaryMobile: formData.motherPrimaryMobile || null,
        motherSecondaryMobile: formData.motherSecondaryMobile || null,
        fatherEmail: formData.fatherEmail || null,
        motherEmail: formData.motherEmail || null,

        // Set password same as roll number
        password: formData.rollNumber
      };

      console.log('Sending student data:', studentData);

      console.log('Sending student creation request with data:', studentData);
      
      const studentResponse = await axios.post(
        'http://localhost:5000/api/admin/students',
        studentData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      console.log('Student creation response:', studentResponse.data);

      if (!studentResponse.data) {
        console.error('Student creation error: Invalid response format');
        throw new Error('Failed to create student record: Invalid response format');
      }

      alert('Student registered successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating student:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        alert('Failed to register student: ' + errorMessage);
      } else {
        alert('Failed to register student: ' + error.message);
      }
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {/* Photo Upload Section */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {formData.photoUrl ? (
                  <>
                    <Avatar
                      src={formData.photoUrl}
                      alt="Student Photo"
                      sx={{
                        width: 200,
                        height: 200,
                        mb: 2,
                        border: '3px solid #fff',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'error.main',
                        color: 'white',
                        '&:hover': { backgroundColor: 'error.dark' }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      border: '2px dashed #ccc',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={handleImageUpload}
                  >
                    <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                      {uploading ? 'Uploading...' : 'Click to upload photo'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  label="Marital Status"
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Caste Category"
                name="castCategory"
                value={formData.castCategory}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identification Mark 1"
                name="identificationMark1"
                value={formData.identificationMark1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identification Mark 2"
                name="identificationMark2"
                value={formData.identificationMark2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Physically Challenged</InputLabel>
                <Select
                  name="isPhysicallyChallenged"
                  value={formData.isPhysicallyChallenged}
                  onChange={handleChange}
                  label="Physically Challenged"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>National Merit Eligible</InputLabel>
                <Select
                  name="isNationalMeritEligible"
                  value={formData.isNationalMeritEligible}
                  onChange={handleChange}
                  label="National Merit Eligible"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Application Number"
                name="applicationNumber"
                value={formData.applicationNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Enquiry Number"
                name="enquiryNumber"
                value={formData.enquiryNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Physical Application Number"
                name="physicalApplicationNumber"
                value={formData.physicalApplicationNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Application Submitted Date"
                name="applicationSubmittedDate"
                value={formData.applicationSubmittedDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Admission Number"
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Roll Number"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="datetime-local"
                fullWidth
                label="Admission Date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="University Region"
                name="universityRegion"
                value={formData.universityRegion}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admission Category"
                name="admissionCategory"
                value={formData.admissionCategory}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admission Mode"
                name="admissionMode"
                value={formData.admissionMode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Program"
                name="program"
                value={formData.program}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Student Type</InputLabel>
                <Select
                  name="studentType"
                  value={formData.studentType}
                  onChange={handleChange}
                  label="Student Type"
                >
                  <MenuItem value="Boarder">Boarder</MenuItem>
                  <MenuItem value="Day Scholar">Day Scholar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Local Student</InputLabel>
                <Select
                  name="isLocal"
                  value={formData.isLocal}
                  onChange={handleChange}
                  label="Local Student"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Alumni">Alumni</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admitted Year"
                name="admittedYear"
                value={formData.admittedYear}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admitted Semester"
                name="admittedSemester"
                value={formData.admittedSemester}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Year"
                name="currentYear"
                value={formData.currentYear}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Semester"
                name="currentSemester"
                value={formData.currentSemester}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Official Email"
                name="studentOfficialEmail"
                type="email"
                value={formData.studentOfficialEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                name="studentWhatsappNumber"
                value={formData.studentWhatsappNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Home Telephone"
                name="homeTelephone"
                value={formData.homeTelephone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Residence Category"
                name="residenceCategory"
                value={formData.residenceCategory}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Family Annual Income"
                name="familyAnnualIncome"
                type="number"
                value={formData.familyAnnualIncome}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8 }}>₹</span>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Occupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Occupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Education Level"
                name="fatherEducationLevel"
                value={formData.fatherEducationLevel}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Education Level"
                name="motherEducationLevel"
                value={formData.motherEducationLevel}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Primary Mobile"
                name="fatherPrimaryMobile"
                value={formData.fatherPrimaryMobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Secondary Mobile"
                name="fatherSecondaryMobile"
                value={formData.fatherSecondaryMobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Primary Mobile"
                name="motherPrimaryMobile"
                value={formData.motherPrimaryMobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Secondary Mobile"
                name="motherSecondaryMobile"
                value={formData.motherSecondaryMobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Email"
                name="fatherEmail"
                type="email"
                value={formData.fatherEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Email"
                name="motherEmail"
                type="email"
                value={formData.motherEmail}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Please review the student information before submitting. The student's login credentials will be created automatically:
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                • Username will be the Roll Number<br />
                • Initial password will be the same as the Roll Number<br />
                • Student can change their password after first login
              </Typography>
            </Grid>
            {/* Add any additional fields or summary here */}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PersonAdd sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4">Add New Student</Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button 
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ px: 4 }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                sx={{ px: 4 }}
              >
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddStudent;