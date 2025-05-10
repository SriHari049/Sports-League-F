import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer'
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await signupUser(form);
      await login(form); // Auto login after signup

      // Redirect based on role
      if (form.role === 'admin') navigate('/admin');
      else if (form.role === 'organizer' || form.role === 'player')
        navigate('/dashboard');
      else navigate('/profile');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ maxWidth: 420, mx: 'auto', p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          🚀 Create Your Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={form.name}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={form.email}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          name="role"
          label="Register As"
          value={form.role}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="viewer">Viewer</MenuItem>
          <MenuItem value="player">Player</MenuItem>
          <MenuItem value="organizer">Organizer</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
