import { Box, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';


const Profile = () => {
  const { user } = useAuth();


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Welcome, {user?.name}</Typography>
      <Typography>Email: {user?.email}</Typography>
      <Typography>Role: {user?.role}</Typography>
    </Box>
  );
};

export default Profile;
