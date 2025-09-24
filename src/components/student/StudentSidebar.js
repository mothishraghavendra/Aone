import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Typography
} from '@mui/material';
import {
  School,
  ExpandLess,
  ExpandMore,
  Assignment,
  Assessment,
  Schedule,
  Grade,
  AccountBox,
  Payment,
  Book,
  LiveHelp,
  Work,
  Class,
  ExitToApp,
  Home,
  Timer,
  MenuBook,
  ReceiptLong,
  CardMembership,
  Edit,
  Lock,
  MeetingRoom,
  DirectionsWalk,
  Report,
  Description,
  WorkHistory,
  MonetizationOn,
  History,
  RestaurantMenu,
  HistoryEdu
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Menu structure for student sidebar
const menuItems = [
  {
    title: 'Academics',
    icon: <School />,
    items: [
      { name: 'Time Table', icon: <Timer />, path: '/student/exam/timetable' },
      { name: 'Attendance', icon: <Schedule />, path: '/student/exam/attendance' },
      { name: 'Syllabus & Curriculum', icon: <MenuBook />, path: '/student/exam/exam-registration' },
    ]
  },
  {
    title: 'Student Services',
    icon: <AccountBox />,
    items: [
      { name: 'My Profile View', icon: <Home />, path: '/student/profile' },
      { name: 'Email Mobile Number Updation', icon: <Edit />, path: '/student/settings/contact' },
      { name: 'Change Password', icon: <Lock />, path: '/student/settings/password' }
    ]
  },
  {
    title: 'Hostel Services',
    icon: <MeetingRoom />,
    items: [
      { name: 'Room Allocation', icon: <MeetingRoom />, path: '/student/hostel/allocation' },
      { name: 'Outing Form', icon: <DirectionsWalk />, path: '/student/hostel/outing' },
      { name: 'Complaints', icon: <Report />, path: '/student/hostel/complaints' },
      { name: 'No Dues Form', icon: <Description />, path: '/student/hostel/no-dues' }
    ]
  },
  {
    title: 'Alumni Services',
    icon: <WorkHistory />,
    items: [
      { name: 'Alumni Job Posting', icon: <Work />, path: '/student/alumni/jobs' },
      { name: 'Alumni Scholarship Posting', icon: <MonetizationOn />, path: '/student/alumni/scholarships' },
      { name: 'Alumni Certifications Posting', icon: <CardMembership />, path: '/student/alumni/certifications' },
      { name: 'Alumni Training Posting', icon: <Class />, path: '/student/alumni/training' }
    ]
  },
  {
    title: 'Exam Resources',
    icon: <HistoryEdu />,
    items: [
      { name: 'Registration', icon: <Assignment />, path: '/student/exam/marks' },
      { name: 'Hall Ticket', icon: <ReceiptLong />, path: '/student/exam/marks' },
      { name: 'Results', icon: <Grade />, path: '/student/exam/marks' },
      { name: 'Examination Revaluation', icon: <Assessment />, path: '/student/exam/revaluation-status' }
    ]
  },
  {
    title: 'Payments & History',
    icon: <Payment />,
    items: [
      { name: 'Reimbursement Online Payment', icon: <MonetizationOn />, path: '/student/payments/reimbursement' },
      { name: 'Mess Fee Payment', icon: <RestaurantMenu />, path: '/student/payments/gateway' },
      { name: 'Examination Fee Payment', icon: <Payment />, path: '/student/payments/gateway' },
      { name: 'My Payment History', icon: <History />, path: '/student/payments/history' }
    ]
  }
];

const StudentSidebar = () => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuClick = (title) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleItemClick = (path, name) => {
    setSelectedItem(name);
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          background: '#001B3D',
          color: '#fff',
          borderRight: 'none'
        },
      }}
    >
      <Box sx={{ 
        overflow: 'auto', 
        mt: 8,
        '&::-webkit-scrollbar': {
          width: '0.4em',
          background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0,0,0,0.1) transparent',
      }}>
        <Box 
          sx={{ 
            p: 2,
            background: '#001B3D',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
        </Box>
        <List sx={{ pt: 1, pb: 2 }}>
          {menuItems.map((menu) => (
            <React.Fragment key={menu.title}>
              <ListItem 
                button 
                onClick={() => handleMenuClick(menu.title)}
                sx={{
                  borderRadius: '4px',
                  mx: 1,
                  mb: 0.5,
                  backgroundColor: openMenus[menu.title] ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& .MuiSvgIcon-root': {
                      color: '#fff'
                    }
                  },
                  '& .MuiListItemText-primary': {
                    color: '#fff',
                    fontWeight: openMenus[menu.title] ? 500 : 400,
                    opacity: openMenus[menu.title] ? 1 : 0.7
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit',
                  minWidth: 36,
                  '& .MuiSvgIcon-root': {
                    fontSize: 20,
                    opacity: 0.9
                  }
                }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={menu.title}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: openMenus[menu.title] ? 600 : 500,
                    letterSpacing: '0.3px'
                  }}
                />
                {openMenus[menu.title] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMenus[menu.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.items.map((item) => (
                    <ListItemButton
                      key={item.name}
                      selected={selectedItem === item.name}
                      onClick={() => handleItemClick(item.path, item.name)}
                      sx={{
                        pl: 4,
                        py: 0.75,
                        mx: 1,
                        my: 0.25,
                        borderRadius: '4px',
                        backgroundColor: selectedItem === item.name ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          '& .MuiSvgIcon-root': {
                            opacity: 1
                          }
                        },
                        '& .MuiListItemText-primary': {
                          color: '#fff',
                          fontWeight: selectedItem === item.name ? 500 : 400,
                          fontSize: '0.875rem',
                          opacity: selectedItem === item.name ? 1 : 0.7
                        },
                        '& .MuiSvgIcon-root': {
                          color: '#fff',
                          fontSize: '1.1rem',
                          opacity: selectedItem === item.name ? 1 : 0.5,
                          transition: 'opacity 0.2s ease'
                        },
                        borderLeft: selectedItem === item.name ? '3px solid rgba(255, 255, 255, 0.5)' : '3px solid transparent'
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: 'inherit',
                        minWidth: 35,
                        '& .MuiSvgIcon-root': {
                          fontSize: 20
                        }
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.name}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: selectedItem === item.name ? 500 : 400,
                          opacity: 0.9,
                          transition: 'all 0.3s ease',
                          transform: selectedItem === item.name ? 'translateX(4px)' : 'none'
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default StudentSidebar;