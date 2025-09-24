import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  School,
  Group,
  AccountBalance,
  Assignment,
  ArrowForward
} from '@mui/icons-material';

const DashboardCard = ({ title, count, icon, subtitle, onClick }) => (
  <Card sx={{ height: '100%', bgcolor: 'background.default' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {count}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <IconButton 
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
            onClick={onClick}
          >
            {icon}
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: 'Total Students',
      count: '1,234',
      icon: <School />,
      subtitle: '150 new this month',
      onClick: () => console.log('Navigate to students')
    },
    {
      title: 'Total Staff',
      count: '89',
      icon: <Group />,
      subtitle: '12 departments',
      onClick: () => console.log('Navigate to staff')
    },
    {
      title: 'Fee Collection',
      count: '₹8.5L',
      icon: <AccountBalance />,
      subtitle: 'This month',
      onClick: () => console.log('Navigate to finance')
    },
    {
      title: 'Pending Tasks',
      count: '25',
      icon: <Assignment />,
      subtitle: '8 high priority',
      onClick: () => console.log('Navigate to tasks')
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Administrator Dashboard
      </Typography>

      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Recent Activities</Typography>
              <IconButton size="small">
                <ArrowForward />
              </IconButton>
            </Box>
            {/* Add activity list or chart here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Quick Actions</Typography>
              <IconButton size="small">
                <ArrowForward />
              </IconButton>
            </Box>
            {/* Add quick action buttons here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;