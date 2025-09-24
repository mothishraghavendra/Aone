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
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get token from localStorage or context
        const token = localStorage.getItem('token');
        const res = await fetch('/api/student/profile', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
            {loading ? (
              <Typography variant="body2" color="gray">Loading...</Typography>
            ) : error ? (
              <Typography variant="body2" color="error">{error}</Typography>
            ) : profile ? (
              <>
                <Avatar alt="User Profile" src={profile.photoUrl || '/logo192.png'} />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle2">{profile.fullName || profile.name || 'Student'}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Roll No: {profile.rollNumber || profile.rollno || '-'}
                  </Typography>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;