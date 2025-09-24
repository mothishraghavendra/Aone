import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Header from '../layout/Header';

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
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentLayout;