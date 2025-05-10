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
    try {
      const response = await fetch('http://localhost:8081/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        await login(data); // Assuming login function handles storing user data
      } else if (contentType && contentType.includes('text/plain')) {
        const data = await response.text();
        await login({ token: data }); // Assuming login function can handle plain text token
      } else {
        throw new Error('Invalid response format');
      }
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
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
