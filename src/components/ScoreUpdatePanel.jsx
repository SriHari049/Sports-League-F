import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const ScoreUpdatePanel = ({ onUpdate, onUndo }) => {
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(score);
    setScore('');
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
        />
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>Update</Button>
        <Button variant="outlined" onClick={onUndo}>Undo</Button>
      </form>
    </Box>
  );
};

export default ScoreUpdatePanel;
