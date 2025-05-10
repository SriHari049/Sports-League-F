import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const TicketBookingForm = ({ onBook }) => {
  const [section, setSection] = useState('General');
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error

    const token = localStorage.getItem('jwtToken'); // JWT token from localStorage

    try {
      const response = await axios.post(
        'https://localhost:8081/tickets', // Replace with actual API endpoint
        { section, seats },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Notify the parent component if needed
        onBook({ section, seats });
        alert('Tickets booked successfully!');
      } else {
        setError('Failed to book tickets.');
      }
    } catch (err) {
      setError('Error booking tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="Section"
        select
        fullWidth
        value={section}
        onChange={(e) => setSection(e.target.value)}
        margin="normal"
      >
        <MenuItem value="General">General</MenuItem>
        <MenuItem value="VIP">VIP</MenuItem>
      </TextField>
      <TextField
        label="Number of Seats"
        type="number"
        fullWidth
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        margin="normal"
      />
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading} // Disable button during loading state
        >
          {loading ? 'Booking...' : 'Book Tickets'}
        </Button>
      </Box>
    </Box>
  );
};

export default TicketBookingForm;
