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
  Avatar,
  IconButton
} from '@mui/material';
import { Save, PersonAdd, CloudUpload, Delete } from '@mui/icons-material';
import axios from 'axios';

const AddStaff = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    email: '',
    mobileNumber: '',
    currentAddress: '',
    permanentAddress: '',
    emergencyContactPerson: '',
    emergencyContactNumber: '',
    department: '',
    roleDesignation: '',
    areasOfExpertise: '',
    educationQualifications: '',
    researchInterests: '',
    previousExperience: '',
    publications: '',
    certifications: '',
    coursesHandled: '',
    dateOfJoining: '',
    employeeId: '',
    employmentType: '',
    salaryCtc: '',
    gradePay: '',
    bankAccountDetails: '',
    panNumber: '',
    aadhaarNumber: '',
    photoUrl: '',
    digitalSignatureUrl: '',
    achievementsAwards: '',
    languagesKnown: '',
    mentoringAvailability: '',
    linkedinProfile: '',
    researchgateProfile: '',
    googleScholarProfile: '',
    specialRoles: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Dummy image upload (replace with Cloudinary or similar if needed)
  const handleImageUpload = async (field) => {
    // Simulate image upload
    const url = window.prompt('Paste image URL here:');
    if (url) {
      setFormData(prev => ({ ...prev, [field]: url }));
    }
  };

  const handleRemoveImage = (field) => {
    setFormData(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) throw new Error('Authentication token not found. Please log in again.');
      const staffData = { ...formData };
      const response = await axios.post(
        'http://localhost:5000/api/admin/staff',
        staffData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      alert('Staff added successfully!');
      setFormData({
        fullName: '', gender: '', dob: '', maritalStatus: '', email: '', mobileNumber: '',
        currentAddress: '', permanentAddress: '', emergencyContactPerson: '', emergencyContactNumber: '',
        department: '', roleDesignation: '', areasOfExpertise: '', educationQualifications: '', researchInterests: '',
        previousExperience: '', publications: '', certifications: '', coursesHandled: '', dateOfJoining: '',
        employeeId: '', employmentType: '', salaryCtc: '', gradePay: '', bankAccountDetails: '', panNumber: '',
        aadhaarNumber: '', photoUrl: '', digitalSignatureUrl: '', achievementsAwards: '', languagesKnown: '',
        mentoringAvailability: '', linkedinProfile: '', researchgateProfile: '', googleScholarProfile: '', specialRoles: ''
      });
    } catch (error) {
      alert('Failed to add staff: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PersonAdd sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4">Add New Staff</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} sm={4}>
              <TextField required fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required fullWidth type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} label="Marital Status">
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required fullWidth label="Email ID" name="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required fullWidth label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Current Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Emergency Contact Person" name="emergencyContactPerson" value={formData.emergencyContactPerson} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Emergency Contact Number" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
            </Grid>
            {/* Professional Information */}
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Role/Designation" name="roleDesignation" value={formData.roleDesignation} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Areas of Expertise" name="areasOfExpertise" value={formData.areasOfExpertise} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Education Level & Qualifications" name="educationQualifications" value={formData.educationQualifications} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Research Interests" name="researchInterests" value={formData.researchInterests} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Previous Work Experience" name="previousExperience" value={formData.previousExperience} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Publications" name="publications" value={formData.publications} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Certifications / Memberships" name="certifications" value={formData.certifications} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Courses Handled" name="coursesHandled" value={formData.coursesHandled} onChange={handleChange} />
            </Grid>
            {/* Administrative / HR Related */}
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="date" label="Date of Joining" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Employment Type</InputLabel>
                <Select name="employmentType" value={formData.employmentType} onChange={handleChange} label="Employment Type">
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Adhoc">Adhoc</MenuItem>
                  <MenuItem value="Visiting Faculty">Visiting Faculty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Salary / CTC" name="salaryCtc" type="number" value={formData.salaryCtc} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Grade Pay" name="gradePay" value={formData.gradePay} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Bank Account Details" name="bankAccountDetails" value={formData.bankAccountDetails} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
            </Grid>
            {/* Photo & Signature */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {formData.photoUrl ? (
                  <>
                    <Avatar src={formData.photoUrl} alt="Staff Photo" sx={{ width: 120, height: 120, mb: 2 }} />
                    <IconButton onClick={() => handleRemoveImage('photoUrl')} sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'error.main', color: 'white' }}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  <Box sx={{ width: 120, height: 120, borderRadius: '50%', border: '2px dashed #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleImageUpload('photoUrl')}>
                    <CloudUpload sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="textSecondary">Upload Photo</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {formData.digitalSignatureUrl ? (
                  <>
                    <Avatar src={formData.digitalSignatureUrl} alt="Digital Signature" sx={{ width: 120, height: 120, mb: 2 }} />
                    <IconButton onClick={() => handleRemoveImage('digitalSignatureUrl')} sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'error.main', color: 'white' }}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  <Box sx={{ width: 120, height: 120, borderRadius: '50%', border: '2px dashed #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleImageUpload('digitalSignatureUrl')}>
                    <CloudUpload sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="textSecondary">Upload Signature</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            {/* Other Details */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Achievements & Awards" name="achievementsAwards" value={formData.achievementsAwards} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Languages Known" name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Mentoring Availability" name="mentoringAvailability" value={formData.mentoringAvailability} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="LinkedIn Profile" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="ResearchGate Profile" name="researchgateProfile" value={formData.researchgateProfile} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Google Scholar Profile" name="googleScholarProfile" value={formData.googleScholarProfile} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label="Special Roles" name="specialRoles" value={formData.specialRoles} onChange={handleChange} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ px: 4 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddStaff;
