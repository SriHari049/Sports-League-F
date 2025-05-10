import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddPlayerDialog from '../components/AddPlayerDialog';
import { useAuth } from '../contexts/AuthContext';
import { fetchPlayers, addPlayer } from '../services/api'; // Updated API functions

const Players = () => {
  const { user } = useAuth(); // Get the user info from context

  // State for players and dialog
  const [players, setPlayers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const isOrganizer = user?.role === 'organizer'; // Check if the user is an organizer
  const categories = ['Football', 'Cricket', 'Tennis', 'Kabaddi'];

  // Fetch players data from the API
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const playersData = await fetchPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    loadPlayers();
  }, []);

  // Handle adding a new player
  const handleAddPlayer = async (newPlayer) => {
    try {
      const playerWithImage = { ...newPlayer, image: newPlayer.image || '/images/players/default.jpg' };
      const addedPlayer = await addPlayer(playerWithImage);
      setPlayers([...players, addedPlayer]);
      setOpenDialog(false); // Close dialog after adding player
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

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
              .filter((player) => player.category === category) // Filter players by category
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
