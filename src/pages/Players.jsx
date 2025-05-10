import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import AddPlayerDialog from '../components/AddPlayerDialog';
import { useAuth } from '../contexts/AuthContext';

const Players = () => {
  const { user } = useAuth();

  const [players, setPlayers] = useState([
    {
      name: 'Alice',
      team: 'Team A',
      position: 'Forward',
      category: 'Football',
      image: '/alice.png'
    },
    {
      name: 'Bob',
      team: 'Team B',
      position: 'Defender',
      category: 'Cricket',
      image: '/bob.png'
    },
    {
      name: 'Charlie',
      team: 'Team C',
      position: 'Raider',
      category: 'Kabaddi',
      image: '/763.jpg'
    }
    
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddPlayer = (newPlayer) => {
    const playerWithImage = {
      ...newPlayer,
      image: newPlayer.image || '/images/players/default.jpg'
    };
    setPlayers([...players, playerWithImage]);
  };

  const isOrganizer = user?.role === 'organizer';

  const categories = ['Football', 'Cricket', 'Tennis', 'Kabaddi'];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Players</Typography>

      {isOrganizer && (
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
            Add Player
          </Button>
          <AddPlayerDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSubmit={handleAddPlayer}
            categories={categories}
          />
        </>
      )}

      {categories.map((category) => (
        <Box key={category} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>{category}</Typography>
          <Grid container spacing={2}>
            {players
              .filter((player) => player.category === category)
              .map((player, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={player.image}
                      alt={`${player.name} photo`}
                    />
                    <CardContent>
                      <Typography variant="h6">{player.name}</Typography>
                      <Typography>Team: {player.team}</Typography>
                      <Typography>Position: {player.position}</Typography>
                      <Typography>Category: {player.category}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Players;
