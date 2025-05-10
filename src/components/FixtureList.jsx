import { List, ListItem, ListItemText } from '@mui/material';

const FixtureList = ({ fixtures, onSelect }) => (
  <List>
    {fixtures.map((fixture) => (
      <ListItem button key={fixture.id} onClick={() => onSelect(fixture)}>
        <ListItemText primary={`${fixture.teamA} vs ${fixture.teamB}`} secondary={fixture.date} />
      </ListItem>
    ))}
  </List>
);

export default FixtureList;
