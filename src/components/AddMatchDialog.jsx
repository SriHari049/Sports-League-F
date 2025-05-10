import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

const AddMatchDialog = ({ open, onClose, onSubmit }) => {
  const [match, setMatch] = useState({ teamA: '', teamB: '', date: '', logoA: '', logoB: '' });

  const handleChange = (e) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e, team) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMatch(prev => ({ ...prev, [team]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit(match);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Match</DialogTitle>
      <DialogContent>
        <TextField label="Team A" name="teamA" fullWidth margin="dense" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, 'logoA')} style={{ margin: '10px 0' }} />
        
        <TextField label="Team B" name="teamB" fullWidth margin="dense" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, 'logoB')} style={{ margin: '10px 0' }} />

        <TextField
          type="date"
          name="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Match</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMatchDialog;
