import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

const AddPlayerDialog = ({ open, onClose, onSubmit, categories = [] }) => {
  const [form, setForm] = useState({
    name: '',
    team: '',
    position: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setForm({ ...form, image: imageURL });
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.team || !form.position || !form.category) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(form);
    onClose();
    setForm({ name: '', team: '', position: '', category: '', image: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Player</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="normal" name="name" label="Name" value={form.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="team" label="Team" value={form.team} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="position" label="Position" value={form.position} onChange={handleChange} />

        <InputLabel sx={{ mt: 2 }}>Category</InputLabel>
        <Select
          fullWidth
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>

        <InputLabel sx={{ mt: 2 }}>Upload Player Image</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginTop: 8 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add Player</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayerDialog;
