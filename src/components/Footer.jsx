import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';

const quickLinks = [
  { label: 'Sports Management', href: '#' },
  { label: 'Sports Engagement', href: '#' },
  { label: 'Company', href: '#' },
  { label: 'Contact Us', href: '#' }
];

const usefulLinks = [
  { label: 'Services', href: '#' },
  { label: 'Legal', href: '#' },
  { label: 'Partners', href: '#' },
  { label: 'Careers', href: '#' }
];

const socialLinks = [
  { icon: <LinkedInIcon />, href: 'https://linkedin.com', color: 'primary' },
  { icon: <FacebookIcon />, href: 'https://facebook.com', color: 'primary' },
  { icon: <TwitterIcon />, href: 'https://twitter.com', color: 'primary' },
  { icon: <YouTubeIcon />, href: 'https://youtube.com', color: 'error' }
];

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', mt: 4, py: 4, px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Logo & Tagline */}
        <Grid item xs={12} md={3}>
          <img src="/hub.png" alt="League Hub Logo" style={{ maxWidth: 120 }} />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            League Hub – The Sports Tech Company
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>QUICK LINKS</Typography>
          {quickLinks.map(link => (
            <Link key={link.label} href={link.href} underline="none" display="block" variant="body2">
              {link.label}
            </Link>
          ))}
        </Grid>

        {/* Useful Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>USEFUL LINKS</Typography>
          {usefulLinks.map(link => (
            <Link key={link.label} href={link.href} underline="none" display="block" variant="body2">
              {link.label}
            </Link>
          ))}
        </Grid>

        {/* App & Contact */}
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>SPORTS ENTERTAINMENT</Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
            <img src="/app.jpg" alt="App Store" width={100} style={{ marginRight: 8 }} />
            <img src="/google.jpg" alt="Play Store" width={100} />
          </Box>
          <Typography variant="body2">Get in Touch</Typography>
          <Typography variant="body2" fontWeight="bold">info@LeagueHub.co</Typography>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box mt={4} textAlign="center">
        <Typography variant="subtitle2" gutterBottom>FOLLOW US ON</Typography>
        {socialLinks.map((social, index) => (
          <IconButton
            key={index}
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>

      {/* Footer Note */}
      <Typography
        variant="caption"
        textAlign="center"
        color="textSecondary"
        display="block"
        sx={{ mt: 3 }}
      >
        © {new Date().getFullYear()} League Hub. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
