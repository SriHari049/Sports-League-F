import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { scheduleMatch } from '../services/matches'; // Assuming the scheduleMatch API service exists

const Schedule = () => {
  const { user } = useAuth();

  const [matchData, setMatchData] = useState({
    teamA: '',
    teamB: '',
    date: '',
    time: '',
    venue: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

  const handleSchedule = async () => {
    const { teamA, teamB, date, time, venue } = matchData;

    if (!teamA || !teamB || !date || !time || !venue) {
      alert('Please fill all fields.');
      return;
    }

    if (teamA === teamB) {
      alert('Team A and Team B must be different.');
      return;
    }

    setLoading(true);

    try {
      // Call the API to schedule the match
      await scheduleMatch({ ...matchData, token: localStorage.getItem('token') });

      alert('Match scheduled successfully!');
      setMatchData({ teamA: '', teamB: '', date: '', time: '', venue: '' });
    } catch (err) {
      setError('Error scheduling match. Please try again.');
    } finally {
      setLoading(false);
    }
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
        {error && <Typography color="error">{error}</Typography>}
        
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
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Schedule Match'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Schedule;
