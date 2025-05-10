import { Box, Button, Grid, Typography, Stack, Chip } from '@mui/material';
import { useState } from 'react';
import AddMatchDialog from '../components/AddMatchDialog';
import ScoreCard from '../components/ScoreCard';
import ScoreUpdatePanel from '../components/ScoreUpdatePanel';
import TicketBookingForm from '../components/TicketBookingForm';
import { useAuth } from '../contexts/AuthContext';

const Matches = () => {
  const { user } = useAuth();

  const categories = ['All', 'Cricket', 'Kabaddi', 'Football', 'Tennis'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [matches, setMatches] = useState([
    {
      id: 1,
      teamA: 'Tigers',
      teamB: 'Lions',
      logoA: '/logos/tigers.png',
      logoB: '/logos/lions.png',
      scoreA: 145,
      scoreB: 130,
      status: 'Live',
      category: 'Cricket',
    },
    {
      id: 2,
      teamA: 'Panthers',
      teamB: 'Wolves',
      logoA: '/logos/panthers.png',
      logoB: '/logos/wolves.png',
      scoreA: 89,
      scoreB: 94,
      status: 'Upcoming',
      category: 'Football',
    }
    // Add more matches with categories...
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddMatch = (newMatch) => {
    const matchWithId = {
      ...newMatch,
      id: matches.length + 1,
      scoreA: 0,
      scoreB: 0,
      status: 'Upcoming',
      category: newMatch.category || 'Cricket', // Default to Cricket
    };
    setMatches([...matches, matchWithId]);
  };

  const filteredMatches = selectedCategory === 'All'
    ? matches
    : matches.filter(match => match.category === selectedCategory);

  const isAdmin = user?.role === 'admin';
  const isOrganizer = user?.role === 'organizer';
  const isViewer = user?.role === 'viewer';

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Matches</Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            color={selectedCategory === cat ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </Stack>

      {isOrganizer && (
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
            Add Match
          </Button>
          <AddMatchDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSubmit={handleAddMatch}
          />
        </>
      )}

      <Grid container spacing={2}>
        {filteredMatches.map((match) => (
          <Grid item xs={12} md={6} key={match.id}>
            <ScoreCard match={match} />
            {isViewer && <TicketBookingForm matchId={match.id} />}
            {isAdmin && <ScoreUpdatePanel matchId={match.id} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Matches;
