import { Box, Card, CardContent, Typography } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About Sports League App
          </Typography>
          <Typography variant="body1" paragraph>
            The Sports League App is a modern web application designed to manage and showcase ongoing and upcoming matches, handle ticket bookings, and manage sports leagues efficiently.
          </Typography>
          <Typography variant="body1" paragraph>
            💼 <strong>Roles:</strong> Admins can manage leagues, matches, tickets, and users. Organizers can schedule games and register players. Viewers can view live scores, upcoming fixtures, and book tickets.
          </Typography>
          <Typography variant="body1" paragraph>
            🚀 Built with <strong>React</strong> and <strong>Material UI</strong>, the app is responsive, dynamic, and mobile-friendly. It’s perfect for managing cricket, football, or other league-based sports.
          </Typography>
          <Typography variant="body1" paragraph>
            📅 Live score updates, player stats, and role-based access make this the ideal solution for real-time league tracking and fan engagement.
          </Typography>
          <Typography variant="caption" display="block" align="center" sx={{ mt: 4 }}>
            &copy; 2025 Sports League App. All rights reserved.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
