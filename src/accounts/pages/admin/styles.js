import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  content: {
    width: '100%',
    marginTop: theme.spacing.unit,
    position: 'relative'
  },
  head: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    marginBottom: theme.spacing.unit
  },
  table: {
    fontSize: 14,
    overflow: 'auto',
    height: 615
  },
  active: {
    color: green[700]
  },
  inactive: {
    color: red[700]
  },
  pagination: {
    paddingRight: 20
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

export default styles;
