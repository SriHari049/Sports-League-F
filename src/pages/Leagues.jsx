import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import AddLeagueDialog from '../components/AddLeagueDialog';
import { useAuth } from '../contexts/AuthContext';

const Leagues = () => {
  const { user } = useAuth(); // get logged-in user

  const [leagues, setLeagues] = useState([
    {
      name: 'Premier League',
      description: 'Top tier football league',
      teams: 10,
      logo: ''
    },
    {
      name: 'Champions Cup',
      description: 'International championship',
      teams: 8,
      logo: ''
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddLeague = (newLeague) => {
    const leagueWithDefaults = { ...newLeague, teams: 0 };
    setLeagues([...leagues, leagueWithDefaults]);
    setOpenDialog(false);
  };

  const handleDeleteLeague = (name) => {
    setLeagues(leagues.filter(l => l.name !== name));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Leagues</Typography>

      {/* Admin-only add button */}
      {user?.role === 'admin' && (
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
            Add League
          </Button>
          <AddLeagueDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSubmit={handleAddLeague}
          />
        </>
      )}

      <Grid container spacing={2}>
        {leagues.map((league, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                {league.logo && (
                  <img
                    src={league.logo}
                    alt={`${league.name} logo`}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'contain',
                      marginBottom: 10
                    }}
                  />
                )}
                <Typography variant="h6">{league.name}</Typography>
                <Typography>{league.description}</Typography>
                <Typography>Teams: {league.teams}</Typography>

                {user?.role === 'admin' && (
                  <Button
                    color="error"
                    onClick={() => handleDeleteLeague(league.name)}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Leagues;
