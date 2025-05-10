import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', mt: 2, py: 2, px: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        {/* Logo */}
        <Grid item xs={12} md={3}>
          <img src="/hub.png" alt="Logo" style={{ maxWidth: 120 }} />
          <Typography mt={0.5} variant="body2" color="textSecondary">
            An Integrass Company
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" fontWeight="bold">QUICK LINKS</Typography>
          <Link href="#" underline="none" display="block" variant="body2">Sports Management</Link>
          <Link href="#" underline="none" display="block" variant="body2">Sports Engagement</Link>
          <Link href="#" underline="none" display="block" variant="body2">Company</Link>
          <Link href="#" underline="none" display="block" variant="body2">Contact Us</Link>
        </Grid>

        {/* Useful Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" fontWeight="bold">USEFUL LINKS</Typography>
          <Link href="#" underline="none" display="block" variant="body2">Services</Link>
          <Link href="#" underline="none" display="block" variant="body2">Legal</Link>
          <Link href="#" underline="none" display="block" variant="body2">Partners</Link>
          <Link href="#" underline="none" display="block" variant="body2">Careers</Link>
        </Grid>

        {/* Entertainment & Contact */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" fontWeight="bold">SPORTS ENTERTAINMENT</Typography>
          <Box mt={1} mb={1}>
            <img src="/app.jpg" alt="App Store" width={100} style={{ marginRight: 8 }} />
            <img src="/google.jpg" alt="Play Store" width={100} />
          </Box>
          <Typography variant="body2">Get in Touch</Typography>
          <Typography variant="body2" fontWeight="bold">info@LeagueHub.co</Typography>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box mt={2} textAlign="center">
        <Typography variant="subtitle2" gutterBottom>FOLLOW US ON</Typography>
        <IconButton size="small"><LinkedInIcon fontSize="small" color="primary" /></IconButton>
        <IconButton size="small"><FacebookIcon fontSize="small" color="primary" /></IconButton>
        <IconButton size="small"><TwitterIcon fontSize="small" color="primary" /></IconButton>
        <IconButton size="small"><YouTubeIcon fontSize="small" color="error" /></IconButton>
      </Box>

      {/* Footer Note */}
      <Typography variant="caption" textAlign="center" mt={2} color="textSecondary" display="block">
        © 2025 League Hub. The Sports Tech Company. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
