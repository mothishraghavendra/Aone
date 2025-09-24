import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { People, School, AttachMoney, Group } from '@mui/icons-material';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const Dashboard = () => {
  // Data for student ratio chart
  const studentRatioData = {
    labels: ['Male Students', 'Female Students'],
    datasets: [
      {
        data: [860, 332],
        backgroundColor: ['#4285f4', '#fbbc05'],
        borderWidth: 0,
      },
    ],
  };

  // Data for earnings chart
  const earningsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Fee Collections',
        data: [153932, 123932, 253932, 133932, 183932],
        borderColor: '#4285f4',
        backgroundColor: 'rgba(66, 133, 244, 0.1)',
        fill: true,
      },
      {
        label: 'Total Expenses',
        data: [60932, 45932, 55932, 40932, 50932],
        borderColor: '#ea4335',
        backgroundColor: 'rgba(234, 67, 53, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Students"
            value="1192"
            icon={<School sx={{ color: 'white' }} />}
            color="#4285f4"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Teachers"
            value="183"
            icon={<Group sx={{ color: 'white' }} />}
            color="#34a853"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Parents"
            value="2031"
            icon={<People sx={{ color: 'white' }} />}
            color="#fbbc05"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Earnings"
            value="₹193000"
            icon={<AttachMoney sx={{ color: 'white' }} />}
            color="#ea4335"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Ratio
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut data={studentRatioData} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Earnings
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line 
                data={earningsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;