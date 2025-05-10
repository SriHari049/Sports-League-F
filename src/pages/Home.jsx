import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const newsItems = [
  'Welcome to League Hub!',
  'Book your tickets now for the Premier League.',
  'Player registrations are open!',
  'Final match of the tournament is this Sunday!',
];

const featuredLeagues = [
  { name: 'Premier League', description: 'Top-tier football in England' },
  { name: 'La Liga', description: 'Spain’s elite league' },
  { name: 'Serie A', description: 'Italian football at its best' },
  { name: 'Bundesliga', description: 'Germany’s powerhouse' },
];

const Home = () => {
  const navigate = useNavigate();

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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
      <Typography variant="h2" align="center" gutterBottom>
        League Hub
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Manage, Participate, and Enjoy Your Favorite Sports Leagues
      </Typography>

      <Box textAlign="center" my={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ mx: 2, px: 4 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/book-tickets')}
          sx={{ mx: 2, px: 4, color: 'white', borderColor: 'white' }}
        >
          Book Tickets
        </Button>
      </Box>

      {/* News Ticker */}
      <Box
        sx={{
          backgroundColor: '#111',
          py: 1,
          px: 2,
          color: '#fff',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'inline-block',
            animation: 'scrollLeft 20s linear infinite',
          }}
        >
          {newsItems.join(' 🔹 ')}
        </Box>

        <style>
          {`
            @keyframes scrollLeft {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </Box>

      {/* Featured Leagues */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Featured Leagues
        </Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2 }}>
          {featuredLeagues.map((league, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 200,
                backgroundColor: '#fff',
                color: 'black',
                flexShrink: 0,
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{league.name}</Typography>
                <Typography variant="body2">{league.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
