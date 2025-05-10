import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', mt: 4, py: 4, px: 3 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Logo */}
        <Grid item xs={12} md={3}>
          <img src="/logo.png" alt="Logo" style={{ maxWidth: 150 }} />
          <Typography mt={1} variant="body2" color="textSecondary">
            An Integrass Company
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" fontWeight="bold">QUICK LINKS</Typography>
          <Link href="#" underline="none" display="block">Sports Management</Link>
          <Link href="#" underline="none" display="block">Sports Engagement</Link>
          <Link href="#" underline="none" display="block">Company</Link>
          <Link href="#" underline="none" display="block">Contact Us</Link>
        </Grid>

        {/* Useful Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" fontWeight="bold">USEFUL LINKS</Typography>
          <Link href="#" underline="none" display="block">Services</Link>
          <Link href="#" underline="none" display="block">Legal</Link>
          <Link href="#" underline="none" display="block">Partners</Link>
          <Link href="#" underline="none" display="block">Careers</Link>
        </Grid>

        {/* Entertainment & Contact */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold">SPORTS ENTERTAINMENT</Typography>
          <Box my={1}>
            <img src="/app.jpg" alt="App Store" width={120} style={{ marginRight: 10 }} />
            <img src="/google.jpg" alt="Play Store" width={120} />
          </Box>
          <Typography mt={2}>Get in Touch</Typography>
          <Typography fontWeight="bold">info@isportz.co</Typography>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box mt={4} textAlign="center">
        <Typography variant="subtitle1" gutterBottom>FOLLOW US ON</Typography>
        <IconButton><LinkedInIcon color="primary" /></IconButton>
        <IconButton><FacebookIcon color="primary" /></IconButton>
        <IconButton><TwitterIcon color="primary" /></IconButton>
        <IconButton><YouTubeIcon color="error" /></IconButton>
      </Box>

      {/* Footer Note */}
      <Typography variant="body2" textAlign="center" mt={4} color="textSecondary">
        © 2025 League Hub. The Sports Tech Company. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
