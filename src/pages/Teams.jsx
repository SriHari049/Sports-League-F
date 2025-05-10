import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const teamCategories = ['All', 'Cricket', 'Kabaddi', 'Football', 'Tennis'];

const Teams = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [formData, setFormData] = useState({ name: '', sport: '', logo: '' });
  const [error, setError] = useState('');

  const userRole = JSON.parse(localStorage.getItem('user'))?.role || 'viewer';
  const token = localStorage.getItem('token');

  // Fetch teams from API on mount
  useEffect(() => {
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://localhost:8081/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(response.data);
      } catch (err) {
        setError('Error fetching teams');
      }
    };

    fetchTeams();
  }, [token]);

  const filteredTeams =
    selectedCategory === 'All'
      ? teams
      : teams.filter((team) => team.sport === selectedCategory);

  const handleOpen = (team = null) => {
    setEditTeam(team);
    setFormData(
      team
        ? { name: team.name, sport: team.sport, logo: team.logo }
        : { name: '', sport: '', logo: '' }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTeam(null);
    setError('');
  };

  const handleSave = async () => {
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    const requestData = {
      name: formData.name,
      sport: formData.sport,
      logo: formData.logo,
    };

    try {
      if (editTeam) {
        // Update team
        await axios.put(`https://localhost:8081/teams/${editTeam.id}`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams((prev) =>
          prev.map((t) => (t.id === editTeam.id ? { ...t, ...formData } : t))
        );
      } else {
        // Add new team
        const response = await axios.post('https://localhost:8081/teams', requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams((prev) => [...prev, response.data]);
      }
      handleClose();
    } catch (err) {
      setError('Error saving team');
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    try {
      await axios.delete(`https://localhost:8081/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Error deleting team');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Stack direction="row" spacing={2} mb={3}>
        {teamCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category)}
            sx={{ borderRadius: '20px', textTransform: 'none' }}
          >
            {category}
          </Button>
        ))}
      </Stack>

      {userRole === 'admin' && (
        <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Add Team
        </Button>
      )}

      <Stack spacing={2}>
        {filteredTeams.map((team) => (
          <Card
            key={team.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={team.logo}
                alt={team.name}
                sx={{ width: 56, height: 56 }}
              />
              <div>
                <Typography variant="h6">{team.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sport: {team.sport}
                </Typography>
              </div>
            </CardContent>
            {userRole === 'admin' && (
              <Stack direction="row" spacing={1} pr={2}>
                <IconButton onClick={() => handleOpen(team)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(team.id)}>
                  <Delete />
                </IconButton>
              </Stack>
            )}
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editTeam ? 'Edit Team' : 'Add Team'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Sport"
            value={formData.sport}
            onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            fullWidth
          />
          <TextField
            label="Logo URL"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            fullWidth
            placeholder="https://example.com/logo.png"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editTeam ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Teams;
