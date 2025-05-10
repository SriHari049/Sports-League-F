import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

const FixtureList = ({
  fixtures = [],
  onSelect,
  showScores = false,
  highlightedFixtureId = null
}) => {
  if (!fixtures.length) {
    return (
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        No fixtures available.
      </Typography>
    );
  }

  return (
    <List>
      {fixtures.map((fixture) => {
        const isHighlighted = fixture.id === highlightedFixtureId;
        const primaryText = `${fixture.teamA} vs ${fixture.teamB}`;
        const secondaryText = showScores && fixture.score
          ? `${fixture.date} — Score: ${fixture.score.teamA} - ${fixture.score.teamB}`
          : fixture.date;

        return (
          <div key={fixture.id}>
            <ListItem
              button
              onClick={() => onSelect?.(fixture)}
              selected={isHighlighted}
            >
              <ListItemText
                primary={primaryText}
                secondary={secondaryText}
              />
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

export default FixtureList;
