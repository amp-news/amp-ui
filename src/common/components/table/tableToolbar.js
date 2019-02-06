import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

const toolbarStyles = theme => ({
  toolbar: {
    minHeight: 56
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

const TableToolbar = ({ headLabel, children, classes }) => (
  <Toolbar className={classes.toolbar}>
    <div className={classes.title}>
      <Typography variant="subheading" id="tableTitle">
        {headLabel}
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>{children}</div>
  </Toolbar>
);

TableToolbar.defaultProps = {
  headLabel: 'Table'
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  headLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withStyles(toolbarStyles)(TableToolbar);
