import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const { team1, team2 } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!team1 || !team2) {
      setError('Match details are missing.');
      setLoading(false);
      return;
    }

    // Simulate fetching match data (replace with actual API request)
    const fetchMatchData = async () => {
      try {
        // Replace with your real data fetching logic
        const data = {
          team1,
          team2,
          time: '2025-05-15 19:00',
          venue: 'Stadium XYZ',
          series: 'Championship Series'
        };
        setMatchInfo(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch match data');
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [team1, team2]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading match details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Match Details
      </Typography>
      <Typography variant="h5">{matchInfo.team1} vs {matchInfo.team2}</Typography>
      <Typography sx={{ mt: 2 }}>
        Time: {matchInfo.time}
      </Typography>
      <Typography>
        Venue: {matchInfo.venue}
      </Typography>
      <Typography>
        Series: {matchInfo.series}
      </Typography>
    </Box>
  );
};

export default MatchDetails;
