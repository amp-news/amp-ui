import green from '@material-ui/core/colors/green';

const styles = theme => ({
  form: {
    minWidth: '300px',
    maxWidth: '500px'
  },
  controlContainer: {
    marginTop: '-12px',
    marginBottom: '24px'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    opacity: 0.9,
    fontSize: 20,
    marginRight: 3 * theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 300
  }
});

export default styles;
