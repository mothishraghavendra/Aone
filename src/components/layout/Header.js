import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box,
  Avatar,
  Badge
} from '@mui/material';
import {
  Notifications,
  Message,
  Language
} from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'black'
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={3} color="error">
              <Message />
            </Badge>
          </IconButton>
          
          <IconButton size="large" color="inherit">
            <Badge badgeContent={7} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton size="large" color="inherit">
            <Language />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">Pranjal Dutta</Typography>
              <Typography variant="caption" color="textSecondary">
                Managing Director
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;