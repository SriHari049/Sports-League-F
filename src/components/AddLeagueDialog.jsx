import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useState } from 'react';

const AddLeagueDialog = ({ open, onClose, onSubmit }) => {
  const [league, setLeague] = useState({
    name: '',
    description: '',
    logo: ''
  });

  const handleChange = (e) => {
    setLeague({ ...league, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLeague((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit(league);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New League</DialogTitle>
      <DialogContent>
        <TextField
          label="League Name"
          name="name"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ marginTop: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add League
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeagueDialog;
