import { Box, Button, Card, CardContent, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import AddLeagueDialog from '../components/AddLeagueDialog';
import { useAuth } from '../contexts/AuthContext';

const Leagues = () => {
  const { user } = useAuth(); // Get logged-in user
  const [leagues, setLeagues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch leagues when the component is mounted
  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/leagues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leagues');
      }

      const data = await response.json();
      setLeagues(data);
    } catch (error) {
      setError('Failed to load leagues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLeague = async (newLeague) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/leagues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLeague),
      });

      if (!response.ok) {
        throw new Error('Failed to add league');
      }

      const data = await response.json();
      setLeagues([...leagues, data]);
      setOpenDialog(false);
    } catch (error) {
      setError('Failed to add league. Please try again.');
    }
  };

  const handleDeleteLeague = async (name) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8081/api/leagues/${name}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete league');
      }

      setLeagues(leagues.filter((league) => league.name !== name));
    } catch (error) {
      setError('Failed to delete league. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Leagues
      </Typography>

      {/* Display error message if there's an issue */}
      {error && <Alert severity="error">{error}</Alert>}

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

      {/* Loading state */}
      {loading ? (
        <CircularProgress />
      ) : (
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
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <Typography variant="h6">{league.name}</Typography>
                  <Typography>{league.description}</Typography>
                  <Typography>Teams: {league.teams}</Typography>

                  {/* Admin-only delete button */}
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
      )}
    </Box>
  );
};

export default Leagues;
