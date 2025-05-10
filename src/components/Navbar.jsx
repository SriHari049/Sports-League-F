import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar
      position="fixed" // ✅ make navbar fixed
      sx={{ backgroundColor: 'rgba(4, 16, 51, 0.9)', zIndex: 1100 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          League Hub
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/fixtures">Fixtures</Button>
          <Button color="inherit" component={Link} to="/matches">Matches</Button>
          <Button color="inherit" component={Link} to="/players">Players</Button>
          <Button color="inherit" component={Link} to="/leagues">Leagues</Button>
          {user?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/schedule">Schedule</Button>
          )}
          {!user ? (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          ) : (
            <>
              <Button color="inherit" onClick={handleMenuOpen}>{user.name}</Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
