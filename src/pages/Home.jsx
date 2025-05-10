import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { useState } from 'react';

const liveMatches = [
  {
    series: 'IPL 2025',
    match: ' Wankhede Stadium,Mumbai',
    team1: 'MI',
    team2: 'RCB',
    status: 'Starts at 11:00 PM',
  },
  {
    series: 'PKL 2025',
    match: 'Shree Shiv Chhatrapati Sports Complex, Balewadi, Pune',
    team1: 'Patna',
    team2: 'Vizay',
    status: 'Starts at 10:00 AM',
  },
  {
    series: 'ISL 2025',
    match: 'Arun Jaitley Stadium, Dehli',
    team1: 'Goa',
    team2: 'Chennai',
    status: 'Starts at: 10:00 AM',
  },
  {
    series: 'India Open 2025',
    match: 'SDAT Tennis Stadium, Bangalore',
    team1: 'Rohan Bopanna',
    team2: 'Mahesh Bhupathi',
    status: 'Starts at: 10:00 AM',
  },
];

const upcomingMatches = [
  {
    series: 'World Cup 2025',
    match: 'Eden Gardens, Kolkata',
    team1: 'India',
    team2: 'Australia',
    status: 'Tomorrow at 2:00 PM',
  },
  {
    series: 'PKL 2025',
    match: 'Jawaharlal Nehru Stadium, Chennai ',
    team1: 'Gujarat',
    team2: 'Tamil Nadu',
    status: 'Saturday at 6:00 PM',
  },
  {
    series: 'Premier League 2025',
    match: 'Old Trafford, Manchester',
    team1: 'Manchester United',
    team2: 'Chelsea',
    status: 'Saturday at 6:00 PM',
  },
  {
    series: 'Premier League 2025',
    match: 'Old Trafford, Manchester',
    team1: 'Manchester United',
    team2: 'Chelsea',
    status: 'Saturday at 6:00 PM',
  },
];

const Home = () => {
  const [scores] = useState(liveMatches);
  const [upcoming] = useState(upcomingMatches);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/stadium.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'hsla(0, 38.50%, 97.50%, 0.60)',
          zIndex: 0,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        color: 'white',
        px: 2,
        py: 4,
      }}
    >
      {/* League Hub Title Box */}
      <Box
        sx={{
          maxWidth: 600,
          margin: '0 auto 40px auto',
          backgroundColor: '#1b1a1a',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          League Hub
        </Typography>
        <Typography variant="h6">
          Manage, Participate, and Enjoy Your Favorite Sports Leagues
        </Typography>
      </Box>

      {/* Live Scores Section */}
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '100%',
          mb: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          Live Scores
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            py: 1,
          }}
        >
          {scores.map((match, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 300,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 2,
                flexShrink: 0,
                boxShadow: 4,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold' }}>
                  {match.series}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: '500' }}>
                  {match.match}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{match.team1}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{match.team2}</Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: match.status.includes('Cancelled') ? 'green' : 'orange',
                    fontWeight: 'bold',
                  }}
                >
                  {match.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Upcoming Matches Section */}
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '100%',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          Upcoming Matches
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            py: 1,
          }}
        >
          {upcoming.map((match, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 300,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 2,
                flexShrink: 0,
                boxShadow: 4,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold' }}>
                  {match.series}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: '500' }}>
                  {match.match}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{match.team1}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{match.team2}</Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: 'gray',
                    fontWeight: 'bold',
                  }}
                >
                  {match.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;