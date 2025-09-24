import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard,
  School,
  Group,
  AttachMoney,
  LocalLibrary,
  DirectionsBus,
  HomeWork,
  Assessment,
  Message
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
const getMenuItems = (role) => {
  const baseItems = [
    { 
      text: 'Dashboard', 
      icon: <Dashboard />, 
      path: `/${role}/dashboard`
    }
  ];

  const adminItems = [
    { 
      text: 'Students', 
      icon: <School />, 
      path: '/admin/students'
    },
    { 
      text: 'Teachers', 
      icon: <Group />, 
      path: '/admin/teachers'
    },
    { 
      text: 'Fee Collection', 
      icon: <AttachMoney />, 
      path: '/admin/fees'
    },
    { 
      text: 'Reports', 
      icon: <Assessment />, 
      path: '/admin/reports'
    }
  ];

  const principalItems = [
    { 
      text: 'Students', 
      icon: <School />, 
      path: '/principal/students'
    },
    { 
      text: 'Teachers', 
      icon: <Group />, 
      path: '/principal/teachers'
    },
    { 
      text: 'Reports', 
      icon: <Assessment />, 
      path: '/principal/reports'
    }
  ];

  const wardenItems = [
    { 
      text: 'Hostel', 
      icon: <HomeWork />, 
      path: '/warden/hostel'
    },
    { 
      text: 'Students', 
      icon: <School />, 
      path: '/warden/students'
    },
    { 
      text: 'Reports', 
      icon: <Assessment />, 
      path: '/warden/reports'
    }
  ];

  const studentItems = [
    { 
      text: 'Attendance', 
      icon: <Assessment />, 
      path: '/student/attendance'
    },
    { 
      text: 'Library', 
      icon: <LocalLibrary />, 
      path: '/student/library'
    },
    { 
      text: 'Fees', 
      icon: <AttachMoney />, 
      path: '/student/fees'
    },
    { 
      text: 'Messages', 
      icon: <Message />, 
      path: '/student/messages'
    }
  ];

  switch (role) {
    case 'admin':
      return [...baseItems, ...adminItems];
    case 'principal':
      return [...baseItems, ...principalItems];
    case 'warden':
      return [...baseItems, ...wardenItems];
    case 'student':
      return [...baseItems, ...studentItems];
    default:
      return baseItems;
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get menu items based on user role
  const menuItems = user ? getMenuItems(user.role) : [];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: 'white'
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            School ERP
          </Typography>
          {user && (
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </Typography>
          )}
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;