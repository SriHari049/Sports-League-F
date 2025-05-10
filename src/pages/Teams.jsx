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
import { useState } from 'react';

const teamCategories = ['All', 'Cricket', 'Kabaddi', 'Football', 'Tennis'];

const initialTeams = [
  {
    id: 1,
    name: 'Mumbai Warriors',
    sport: 'Cricket',
    logo: '/mi.png',
  },
  {
    id: 2,
    name: 'Delhi Dynamos',
    sport: 'Football',
    logo: '/dd.png',
  },
  {
    id: 3,
    name: 'Mumba',
    sport: 'Kabbadi',
    logo: '/mumba.png',
  },
  {
    id: 4,
    name: 'Bengaluru Bulls',
    sport: 'Kabaddi',
    logo: '/bb.png',
  },
  {
    id: 5,
    name: 'Rajasthan Royals',
    sport: 'Kabaddi',
    logo: '/rr.png',
  },
  {
    id: 6,
    name: 'Kolkata Knight Riders',
    sport: 'Cricket',
    logo: '/kkr.png',
  },
  {
    id: 7,
    name: 'Chennai Super Kings',
    sport: 'Cricket',
    logo: '/csk.png',
  },
];

const Teams = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [teams, setTeams] = useState(initialTeams);
  const [open, setOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [formData, setFormData] = useState({ name: '', sport: '', logo: '' });

  const userRole = JSON.parse(localStorage.getItem('user'))?.role || 'viewer';

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
  };

  const handleSave = () => {
    if (editTeam) {
      setTeams((prev) =>
        prev.map((t) => (t.id === editTeam.id ? { ...t, ...formData } : t))
      );
    } else {
      const newTeam = {
        id: Date.now(),
        ...formData,
      };
      setTeams((prev) => [...prev, newTeam]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>

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
