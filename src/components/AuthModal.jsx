import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const AuthModal = ({ open, onClose, children }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Authentication Required</DialogTitle>
    <DialogContent>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Please log in to continue.
      </Typography>
      {children}
    </DialogContent>
  </Dialog>
);

export default AuthModal;
