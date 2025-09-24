import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  School,
  Person,
  Class,
  Assessment,
  ExpandMore,
  Assignment,
  Payment,
  AccountBox,
  Schedule,
  Grade,
  Book,
  Work,
  LiveHelp,
  ExitToApp
} from '@mui/icons-material';

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

const StudentDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Student
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Attendance"
            value="85%"
            icon={<Person sx={{ color: 'white' }} />}
            color="#4285f4"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Classes Today"
            value="5"
            icon={<Class sx={{ color: 'white' }} />}
            color="#34a853"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Assignments Due"
            value="3"
            icon={<Assessment sx={{ color: 'white' }} />}
            color="#fbbc05"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Library Books"
            value="2"
            icon={<School sx={{ color: 'white' }} />}
            color="#ea4335"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {/* Examination Section */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">Examination</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary="PC/CGS Registration" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Assessment /></ListItemIcon>
                <ListItemText primary="Exam Registration" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Schedule /></ListItemIcon>
                <ListItemText primary="Student-Wise Time Table" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Grade /></ListItemIcon>
                <ListItemText primary="Revaluation Registration" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Student Services */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">Student Services</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><AccountBox /></ListItemIcon>
                <ListItemText primary="My Profile View" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Payment /></ListItemIcon>
                <ListItemText primary="Fee Payments" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Book /></ListItemIcon>
                <ListItemText primary="Course Completion Certificate" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><LiveHelp /></ListItemIcon>
                <ListItemText primary="No Dues Form" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Alumni Services */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">Alumni Services</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><Work /></ListItemIcon>
                <ListItemText primary="Alumni Job Posting" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><School /></ListItemIcon>
                <ListItemText primary="Alumni Scholarship Posting" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary="Alumni Certifications Posting" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Class /></ListItemIcon>
                <ListItemText primary="Alumni Training Posting" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Exam Resources */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">Exam Resources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><Assessment /></ListItemIcon>
                <ListItemText primary="Examination Revaluation" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Grade /></ListItemIcon>
                <ListItemText primary="Exam Marks" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Payment Section */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">Payments & History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><Payment /></ListItemIcon>
                <ListItemText primary="Payment Gateway" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Assessment /></ListItemIcon>
                <ListItemText primary="My Payment History" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><Payment /></ListItemIcon>
                <ListItemText primary="Reimbursement Online Payment" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* User Administration */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6" color="primary">User Administration</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton>
                <ListItemIcon><AccountBox /></ListItemIcon>
                <ListItemText primary="Email Mobile Number Updation" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><ExitToApp /></ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default StudentDashboard;