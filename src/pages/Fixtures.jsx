// src/pages/Fixtures.jsx
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const storedFixtures = JSON.parse(localStorage.getItem('fixtures')) || [];
    setFixtures(storedFixtures);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>📅 Upcoming Fixtures</Typography>
      {fixtures.length === 0 ? (
        <Typography>No upcoming matches.</Typography>
      ) : (
        <Grid container spacing={2}>
          {fixtures.map(fixture => (
            <Grid item xs={12} sm={6} md={4} key={fixture.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{fixture.teamA} vs {fixture.teamB}</Typography>
                  <Typography>Date: {fixture.date}</Typography>
                  <Typography>Time: {fixture.time}</Typography>
                  <Typography>Venue: {fixture.venue}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Fixtures;
