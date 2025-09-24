import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get('http://localhost:5000/api/student/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStudent(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching student profile:', err);
        setError('Failed to load student profile. ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!student) {
    return (
      <Box p={3}>
        <Alert severity="info">No student data found.</Alert>
      </Box>
    );
  }

  const InfoSection = ({ title, items }) => (
    <Box mb={4}>
      <Typography variant="h6" color="primary" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
        {title}
      </Typography>
      <List dense>
        {items.map(([label, value], index) => (
          value && (
            <ListItem key={index}>
              <ListItemText
                primary={label}
                secondary={value}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  color: 'text.secondary'
                }}
                secondaryTypographyProps={{
                  variant: 'body1',
                  color: 'text.primary'
                }}
              />
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header with photo */}
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            src={student.photoUrl}
            alt={student.fullName}
            sx={{
              width: 150,
              height: 150,
              mr: 4,
              border: '3px solid #fff',
              boxShadow: 3
            }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {student.fullName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Roll Number: {student.rollNumber}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {student.program} - {student.degree}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <InfoSection
              title="Basic Information"
              items={[
                ['Admission Number', student.admissionNumber],
                ['Application Number', student.applicationNumber],
                ['Date of Birth', new Date(student.dob).toLocaleDateString()],
                ['Gender', student.gender],
                ['Blood Group', student.bloodGroup],
                ['Nationality', student.nationality],
                ['Religion', student.religion],
                ['Marital Status', student.maritalStatus],
                ['Caste Category', student.casteCategory],
                ['Caste', student.caste]
              ]}
            />
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12} md={6}>
            <InfoSection
              title="Academic Information"
              items={[
                ['University Region', student.universityRegion],
                ['Admission Category', student.admissionCategory],
                ['Admission Mode', student.admissionMode],
                ['Student Type', student.studentType],
                ['Is Local Student', student.isLocal],
                ['Status', student.status],
                ['Admitted Year', student.admittedYear],
                ['Admitted Semester', student.admittedSemester],
                ['Current Year', student.currentYear],
                ['Current Semester', student.currentSemester]
              ]}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <InfoSection
              title="Contact Information"
              items={[
                ['Email', student.email],
                ['Official Email', student.studentOfficialEmail],
                ['Mobile Number', student.mobileNumber],
                ['WhatsApp Number', student.studentWhatsappNumber],
                ['Home Telephone', student.homeTelephone],
                ['Residence Category', student.residenceCategory]
              ]}
            />
          </Grid>

          {/* Family Information */}
          <Grid item xs={12} md={6}>
            <InfoSection
              title="Family Information"
              items={[
                ["Father's Name", student.fatherName],
                ["Mother's Name", student.motherName],
                ["Father's Occupation", student.fatherOccupation],
                ["Mother's Occupation", student.motherOccupation],
                ["Father's Education", student.fatherEducationLevel],
                ["Mother's Education", student.motherEducationLevel],
                ["Father's Mobile (Primary)", student.fatherPrimaryMobile],
                ["Father's Mobile (Secondary)", student.fatherSecondaryMobile],
                ["Mother's Mobile (Primary)", student.motherPrimaryMobile],
                ["Mother's Mobile (Secondary)", student.motherSecondaryMobile],
                ["Father's Email", student.fatherEmail],
                ["Mother's Email", student.motherEmail],
                ['Family Annual Income', student.familyAnnualIncome ? `₹${student.familyAnnualIncome}` : null]
              ]}
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <InfoSection
              title="Additional Information"
              items={[
                ['Identification Mark 1', student.identificationMark1],
                ['Identification Mark 2', student.identificationMark2],
                ['Physically Challenged', student.isPhysicallyChallenged],
                ['National Merit Eligible', student.isNationalMeritEligible]
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StudentProfile;