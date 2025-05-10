import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      await signup(form);
    } else {
      await login({ email: form.email, password: form.password });
    }
    navigate('/');
  };

return (
    <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {isSignup ? 'Sign Up' : 'Login'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                {isSignup && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {isSignup && (
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Select Role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        SelectProps={{ native: true }}
                        required
                    >
                        <option value="viewer">Viewer</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                    </TextField>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    {isSignup ? 'Create Account' : 'Login'}
                </Button>
                <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Grid item>
                        <Button onClick={() => setIsSignup((prev) => !prev)}>
                            {isSignup
                                ? 'Already have an account? Login'
                                : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </Container>
);
};

export default Auth;
