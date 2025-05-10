import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const ScoreUpdatePanel = ({ matchId, onUndo }) => {
  const [score, setScore] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors if any

    const token = localStorage.getItem('jwtToken'); // JWT token from storage

    try {
      const response = await axios.post(
        `https://localhost:8081/matches/${matchId}/update`, // Replace with actual API endpoint
        { score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // On successful score update, call onUpdate (if needed)
        alert('Score updated successfully!');
      } else {
        setError('Failed to update the score.');
      }
    } catch (err) {
      setError('Error updating score. Please try again later.');
    } finally {
      setLoading(false);
      setScore(''); // Clear score input after submission
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Update Score"
          fullWidth
          value={score}
          onChange={(e) => setScore(e.target.value)}
          margin="normal"
          disabled={loading} // Disable input during loading state
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
            sx={{ mr: 1 }}
            disabled={loading} // Disable button during loading state
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
          <Button
            variant="outlined"
            onClick={onUndo}
            disabled={loading} // Disable Undo button during loading state
          >
            Undo
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ScoreUpdatePanel;
