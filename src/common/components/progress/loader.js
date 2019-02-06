import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
  progress: {
    position: 'absolute',
    margin: 'auto',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  }
});

const Loader = ({ classes }) => <CircularProgress size={50} className={classes.progress} />;

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
