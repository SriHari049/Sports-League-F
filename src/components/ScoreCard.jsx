import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

const ScoreCard = ({ match }) => {
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
