// components/AddPlayerDialog.jsx
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

const AddPlayerDialog = ({ open, onClose, onSubmit, categories }) => {
  const [playerData, setPlayerData] = useState({
    name: '',
    team: '',
    position: '',
    category: categories[0], // Default category to the first in the list
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!playerData.name || !playerData.team || !playerData.position || !playerData.category) {
      alert('Please fill all fields.');
      return;
    }
    onSubmit(playerData);
    setPlayerData({
      name: '',
      team: '',
      position: '',
      category: categories[0],
      image: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Player</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Player Name"
          name="name"
          value={playerData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Team"
          name="team"
          value={playerData.team}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={playerData.position}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={playerData.category}
          onChange={handleChange}
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={playerData.image}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Add Player
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayerDialog;
