import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

const TicketBookingForm = ({ onBook }) => {
  const [section, setSection] = useState('General');
  const [seats, setSeats] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({ section, seats });
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
      <Button type="submit" variant="contained" fullWidth>Book Tickets</Button>
    </Box>
  );
};

export default TicketBookingForm;
