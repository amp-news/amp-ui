import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Zoom from '@material-ui/core/Zoom/Zoom';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Grid from '@material-ui/core/Grid/Grid';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import { cancelEditUser, editUser, updateEditUser } from './actions';

const styles = theme => ({
  snackbar: {
    width: '100%'
  },
  description: {
    width: '100%',
    backgroundColor: theme.palette.primary.main
  }
});

class AccountEditDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickname: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string
    }),
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ),
    statuses: PropTypes.arrayOf(PropTypes.string),
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: null,
    roles: [],
    statuses: []
  };

  constructor(props) {
    super(props);

    this.state = {
      roleDescriptionVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.state;

    if (user !== nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  handleRoleChange = role => {
    const { user } = this.state;
    const { handleChange } = this.props;

    handleChange({ ...user, role });
  };

  handleStatusChange = status => {
    const { user } = this.state;
    const { handleChange } = this.props;

    handleChange({ ...user, status });
  };

  toggleRoleDescription = () =>
    this.setState(prevState => ({
      roleDescriptionVisible: !prevState.roleDescriptionVisible
    }));

  render() {
    const { open, roles, statuses, handleSave, handleCancel, classes } = this.props;
    const { user, roleDescriptionVisible } = this.state;

    return !user ? null : (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Zoom}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">
          Edit Account: {`${user.firstName} ${user.lastName}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="firstName"
            label="First Name"
            placeholder="First Name"
            value={user.firstName}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            fullWidth
          />

          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            value={user.lastName}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            fullWidth
          />

          <Grid container alignItems="center" direction="row" justify="space-between">
            <Grid item xs={10}>
              <TextField
                id="role"
                select
                label="Role"
                value={user.role}
                onChange={e => this.handleRoleChange(e.target.value)}
                helperText="Please select new role"
                margin="normal"
                fullWidth
              >
                {roles &&
                  roles.map(role => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={0} zeroMinWidth>
              <IconButton
                onMouseOver={this.toggleRoleDescription}
                onMouseOut={this.toggleRoleDescription}
                aria-label="Description"
              >
                <HelpIcon />
              </IconButton>
            </Grid>
          </Grid>

          <TextField
            id="status"
            select
            label="Status"
            value={user.status}
            onChange={e => this.handleStatusChange(e.target.value)}
            helperText="Please select new status"
            margin="normal"
            fullWidth
          >
            {statuses &&
              statuses.map(status => (
                <MenuItem key={status.id} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
          </TextField>

          <Snackbar open={roleDescriptionVisible} className={classes.snackbar}>
            <SnackbarContent
              className={classes.description}
              aria-describedby="message-id"
              message={
                <span id="message-id">
                  {roles.find(role => role.name === user.role).description}
                </span>
              }
            />
          </Snackbar>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleSave(user)}>
            Save
          </Button>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.pages.admin.edit.user,
  roles: state.account.pages.admin.edit.roles,
  statuses: state.account.pages.admin.edit.statuses,
  open: state.account.pages.admin.edit.open
});

const mapDispatchToProps = dispatch => ({
  handleSave: bindActionCreators(editUser, dispatch),
  handleCancel: bindActionCreators(cancelEditUser, dispatch),
  handleChange: bindActionCreators(updateEditUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AccountEditDialog));
