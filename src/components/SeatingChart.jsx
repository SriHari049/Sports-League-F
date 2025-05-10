import { Grid, Paper } from '@mui/material';

const SeatingChart = ({ layout }) => (
  <Grid container spacing={2} sx={{ p: 2 }}>
    {layout.map((seat, idx) => (
      <Grid item xs={3} key={idx}>
        <Paper elevation={seat.available ? 3 : 1} sx={{ p: 1, textAlign: 'center', bgcolor: seat.available ? 'green' : 'red', color: 'white' }}>
          {seat.label}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default SeatingChart;
