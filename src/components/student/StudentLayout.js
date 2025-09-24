import React from 'react';
import { Box } from '@mui/material';
import { Outlet, Routes, Route } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Header from '../layout/Header';
import Dashboard from '../../pages/Dashboard';
import StudentProfile from '../../pages/student/StudentProfile';

const StudentLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <StudentSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exam/registration" element={<div>PC/CGS Registration</div>} />
          <Route path="exam/exam-registration" element={<div>Exam Registration</div>} />
          <Route path="exam/timetable" element={<div>Student-Wise Time Table</div>} />
          <Route path="exam/revaluation" element={<div>Revaluation</div>} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="fees" element={<div>Fee Payments</div>} />
          <Route path="certificate" element={<div>Course Completion Certificate</div>} />
          <Route path="no-dues" element={<div>No Dues Form</div>} />
          <Route path="payments/*" element={<div>Payments Section</div>} />
          <Route path="settings/*" element={<div>Settings</div>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default StudentLayout;