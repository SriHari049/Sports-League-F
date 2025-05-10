import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const ScoreCard = ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch JWT token from localStorage (or any other storage solution)
    const token = localStorage.getItem('jwtToken');

    // Fetch match data from the API
    const fetchMatchData = async () => {
      try {
        const response = await axios.get(`https://localhost:8081/matches/${matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatch(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch match data.');
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        {/* Top Row with Team Logos and Names */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {/* Team A */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={match.logoA}
              alt={`${match.teamA} logo`}
              sx={{ width: 48, height: 48, mr: 1 }}
            />
            <Typography variant="subtitle1">{match.teamA}</Typography>
          </Box>

          <Typography variant="body1" sx={{ mx: 1 }}>vs</Typography>

          {/* Team B */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>{match.teamB}</Typography>
            <Avatar
              src={match.logoB}
              alt={`${match.teamB} logo`}
              sx={{ width: 48, height: 48 }}
            />
          </Box>
        </Box>

        {/* Match Info */}
        <Typography variant="body2">Status: {match.status || 'Upcoming'}</Typography>
        <Typography variant="body2">
          Score: {match.scoreA ?? '-'} - {match.scoreB ?? '-'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
