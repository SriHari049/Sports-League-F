import { Box, Card, CardContent, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch fixtures when the component is mounted
  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/fixtures', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fixtures');
      }

      const data = await response.json();
      setFixtures(data);
    } catch (error) {
      setError('Failed to load fixtures. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>📅 Upcoming Fixtures</Typography>

      {/* Display error message if there's an issue */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loading state */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {fixtures.length === 0 ? (
            <Typography>No upcoming matches.</Typography>
          ) : (
            <Grid container spacing={2}>
              {fixtures.map((fixture) => (
                <Grid item xs={12} sm={6} md={4} key={fixture.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {fixture.teamA} vs {fixture.teamB}
                      </Typography>
                      <Typography>Date: {fixture.date}</Typography>
                      <Typography>Time: {fixture.time}</Typography>
                      <Typography>Venue: {fixture.venue}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default Fixtures;
