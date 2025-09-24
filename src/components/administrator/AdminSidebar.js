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
  Dashboard,
  ExpandLess,
  ExpandMore,
  School,
  Group,
  Person,
  PersonAdd,
  Settings,
  Payment,
  Book,
  Class,
  Assessment,
  HomeWork,
  Schedule,
  AccountCircle,
  SupervisorAccount,
  Assignment,
  Notifications,
  LocalLibrary,
  MenuBook,
  EventNote,
  People,
  Money,
  AccountBalance,
  Receipt,
  Business,
  MeetingRoom,
  Restaurant,
  Report
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Menu structure for administrator sidebar
const menuItems = [
  {
    title: 'Dashboard',
    icon: <Dashboard />,
    items: [
      { name: 'Overview', icon: <Assessment />, path: '/admin/dashboard' },
      { name: 'Analytics', icon: <Assessment />, path: '/admin/analytics' },
      { name: 'Reports', icon: <Assignment />, path: '/admin/reports' }
    ]
  },
  {
    title: 'Student Management',
    icon: <School />,
    items: [
      { name: 'Add Student', icon: <Person />, path: '/admin/students/add' },
      { name: 'Manage Students', icon: <Group />, path: '/admin/students/manage' },
      { name: 'Student Records', icon: <Assignment />, path: '/admin/students/records' },
      { name: 'Student Attendance', icon: <EventNote />, path: '/admin/students/attendance' }
    ]
  },
  {
    title: 'Staff Management',
    icon: <SupervisorAccount />,
    items: [
      { name: 'Add Staff', icon: <PersonAdd />, path: '/admin/staff/add' },
      { name: 'Manage Staff', icon: <People />, path: '/admin/staff/manage' },
      { name: 'Staff Attendance', icon: <EventNote />, path: '/admin/staff/attendance' },
      { name: 'Staff Records', icon: <Assignment />, path: '/admin/staff/records' }
    ]
  },
  {
    title: 'Academic Management',
    icon: <LocalLibrary />,
    items: [
      { name: 'Class Management', icon: <Class />, path: '/admin/academics/classes' },
      { name: 'Subject Management', icon: <MenuBook />, path: '/admin/academics/subjects' },
      { name: 'Timetable', icon: <Schedule />, path: '/admin/academics/timetable' },
      { name: 'Exam Management', icon: <Assignment />, path: '/admin/academics/exams' }
    ]
  },
  {
    title: 'Hostel Management',
    icon: <HomeWork />,
    items: [
      { name: 'Room Allocation', icon: <MeetingRoom />, path: '/admin/hostel/rooms' },
      { name: 'Mess Management', icon: <Restaurant />, path: '/admin/hostel/mess' },
      { name: 'Hostel Staff', icon: <Group />, path: '/admin/hostel/staff' },
      { name: 'Complaints', icon: <Report />, path: '/admin/hostel/complaints' }
    ]
  },
  {
    title: 'Finance Management',
    icon: <AccountBalance />,
    items: [
      { name: 'Fee Collection', icon: <Money />, path: '/admin/finance/fees' },
      { name: 'Expenses', icon: <Receipt />, path: '/admin/finance/expenses' },
      { name: 'Salary Management', icon: <Payment />, path: '/admin/finance/salary' },
      { name: 'Financial Reports', icon: <Assessment />, path: '/admin/finance/reports' }
    ]
  },
  {
    title: 'System Settings',
    icon: <Settings />,
    items: [
      { name: 'School Profile', icon: <Business />, path: '/admin/settings/school' },
      { name: 'Academic Year', icon: <Schedule />, path: '/admin/settings/academic-year' },
      { name: 'User Management', icon: <Group />, path: '/admin/settings/users' },
      { name: 'System Config', icon: <Settings />, path: '/admin/settings/config' }
    ]
  }
];

const AdminSidebar = () => {
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
          background: '#1A237E', // Dark blue background for admin
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
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent',
      }}>
        <Box 
          sx={{ 
            p: 2,
            background: '#1A237E',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Administrator
          </Typography>
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

export default AdminSidebar;