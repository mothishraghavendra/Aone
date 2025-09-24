import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Group, AssignmentTurnedIn, Announcement, EventNote } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Box>
      <Typography color="textSecondary" variant="h6">
        {title}
      </Typography>
      <Typography variant="h4">
        {value}
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '50%',
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </Box>
  </Paper>
);

const WardenDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hostel Management Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total Students"
            value="450"
            icon={<Group sx={{ color: 'white' }} />}
            color="#4285f4"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Room Occupancy"
            value="92%"
            icon={<EventNote sx={{ color: 'white' }} />}
            color="#34a853"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Complaints"
            value="5"
            icon={<Announcement sx={{ color: 'white' }} />}
            color="#fbbc05"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Leave Requests"
            value="8"
            icon={<AssignmentTurnedIn sx={{ color: 'white' }} />}
            color="#ea4335"
          />
        </Grid>
      </Grid>

      {/* Add more warden-specific content here */}
    </Box>
  );
};

export default WardenDashboard;