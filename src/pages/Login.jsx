import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    await login(credentials);
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
      <TextField fullWidth type="password" label="Password" name="password" margin="normal" onChange={handleChange} />
      <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
      <Button variant="text" fullWidth onClick={() => navigate('/signup')} sx={{ mt: 1 }}>
        Don't have an account? Sign Up
      </Button>
    </Box>
  );
};

export default Login;
