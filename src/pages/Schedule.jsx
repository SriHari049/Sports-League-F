import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Schedule = () => {
  const { user } = useAuth();

  const [matchData, setMatchData] = useState({
    teamA: '',
    teamB: '',
    date: '',
    time: '',
    venue: ''
  });

  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

  const handleSchedule = () => {
    const { teamA, teamB, date, time, venue } = matchData;

    if (!teamA || !teamB || !date || !time || !venue) {
      alert('Please fill all fields.');
      return;
    }

    if (teamA === teamB) {
      alert('Team A and Team B must be different.');
      return;
    }

    const newMatch = {
      id: Date.now(),
      ...matchData
    };

    const existing = JSON.parse(localStorage.getItem('fixtures')) || [];
    localStorage.setItem('fixtures', JSON.stringify([...existing, newMatch]));

    alert('Match scheduled successfully!');
    setMatchData({ teamA: '', teamB: '', date: '', time: '', venue: '' });
  };

  if (user?.role !== 'admin') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">Access denied. Admins only.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>📅 Schedule a Match</Typography>
      <Paper sx={{ maxWidth: 500, p: 3, mx: 'auto' }}>
        <TextField
          fullWidth
          label="Team A"
          name="teamA"
          value={matchData.teamA}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Team B"
          name="teamB"
          value={matchData.teamB}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Date"
          name="date"
          value={matchData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="time"
          label="Time"
          name="time"
          value={matchData.time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Venue / Stadium"
          name="venue"
          value={matchData.venue}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSchedule}
        >
          Schedule Match
        </Button>
      </Paper>
    </Box>
  );
};

export default Schedule;
