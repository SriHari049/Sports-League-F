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

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setLeague({ ...league, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await fetch('https://localhost:8081/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if you use another auth method
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setLeague((prev) => ({ ...prev, logo: data.url }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
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
          value={league.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="dense"
          value={league.description}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ marginTop: 16 }}
          disabled={uploading}
        />
        {uploading && <p>Uploading image...</p>}
        {league.logo && (
          <img
            src={league.logo}
            alt="League Logo"
            style={{ width: 100, height: 100, marginTop: 10, objectFit: 'contain' }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={uploading}>
          Add League
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeagueDialog;
