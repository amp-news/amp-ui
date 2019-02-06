import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Button from '@material-ui/core/Button/Button';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import SuccessIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import styles from './styles';

export const MODE = Object.freeze({
  NEW: 0,
  EDIT: 1
});

class ProfileForm extends Component {
  static propTypes = {
    mode: PropTypes.oneOf([MODE.NEW, MODE.EDIT]).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickname: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string
    }),
    success: PropTypes.bool,
    error: PropTypes.shape({
      code: PropTypes.number,
      description: PropTypes.string,
      timestamp: PropTypes.string,
      path: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.string)
    }),
    actionName: PropTypes.string.isRequired,
    actionHandler: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: {},
    error: null,
    success: null
  };

  constructor(props) {
    super(props);

    const { mode, user, success } = props;

    this.state = {
      showMessage: success !== null,
      showPassword: false,
      id: user.id,
      firstName: {
        error: false,
        editable: mode === MODE.NEW,
        value: user.firstName
      },
      lastName: {
        error: false,
        editable: mode === MODE.NEW,
        value: user.lastName
      },
      nickname: {
        error: false,
        editable: true,
        value: user.nickname
      },
      email: {
        error: false,
        editable: mode === MODE.NEW,
        value: user.email
      },
      password: {
        visible: mode === MODE.NEW,
        error: false
      },
      passwordCheck: {
        visible: mode === MODE.NEW,
        error: false
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const { success } = newProps;

    if (success !== null) {
      this.setState({
        showMessage: true
      });
    }
  }

  handleMessagesClose = () => {
    this.setState({ showMessage: false });
  };

  togglePasswordVisibility = event => {
    event.preventDefault();
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = (field, value) => {
    this.setState(prevState => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        error: false,
        value
      }
    }));
  };

  handlePasswordCheck = password => {
    this.setState(prevState => ({
      ...prevState,
      passwordCheck: {
        ...prevState.passwordCheck,
        error: false,
        value: password
      }
    }));
  };

  validate = () => {
    const { firstName, lastName, nickname, email, password, passwordCheck } = this.state;

    let valid = true;

    if (firstName.editable && (!firstName.value || firstName.value.length > 100)) {
      firstName.error = true;
      valid = false;
    }

    if (lastName.editable && (!lastName.value || lastName.value.length > 100)) {
      lastName.error = true;
      valid = false;
    }

    if (nickname.editable && (nickname.value && !/[a-zA-Z0-9_-]{3,15}/.test(nickname.value))) {
      nickname.error = true;
      valid = false;
    }

    if (
      email.editable &&
      (!email.value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
    ) {
      email.error = true;
      valid = false;
    }

    if (password.visible) {
      if (
        !password.value ||
        !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})/.test(password.value)
      ) {
        password.error = true;
        valid = false;
      } else if (password.value !== passwordCheck.value) {
        passwordCheck.error = true;
        valid = false;
      }
    }

    if (!valid) {
      this.setState(prevState => ({
        ...prevState,
        firstName,
        lastName,
        nickname,
        email,
        password,
        passwordCheck
      }));
    }

    return valid;
  };

  handleAction = () => {
    const { actionHandler } = this.props;

    if (this.validate()) {
      const { id, firstName, lastName, nickname, email, password } = this.state;

      const user = {
        ...(!!id && { id }),
        ...(firstName.editable && { firstName: firstName.value }),
        ...(lastName.editable && { lastName: lastName.value }),
        ...(nickname.editable && { nickname: nickname.value }),
        ...(email.editable && { email: email.value }),
        ...(password.visible && { password: password.value })
      };

      actionHandler(user);
    }
  };

  render() {
    const { actionName, success, error, classes } = this.props;
    const {
      showMessage,
      firstName,
      lastName,
      nickname,
      email,
      password,
      passwordCheck,
      showPassword
    } = this.state;

    return (
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="space-between"
        spacing={16}
        className={classes.form}
      >
        {showMessage && (
          <Grid item>
            <Snackbar
              open={showMessage}
              autoHideDuration={5000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              onClose={this.handleMessagesClose}
            >
              <SnackbarContent
                className={success ? classes.success : classes.error}
                message={
                  <span className={classes.message}>
                    {success ? (
                      <div>
                        <SuccessIcon className={classes.icon} />
                        <span>Success!</span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon className={classes.icon} />
                        {error.messages.map(message => <span>{message}</span>)}
                      </div>
                    )}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleMessagesClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                ]}
              />
            </Snackbar>
          </Grid>
        )}

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={8}
            wrap="nowrap"
          >
            <Grid item xs={6}>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant="subheading" color="textSecondary">
                Personal
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Divider />
            </Grid>
          </Grid>

          <div className={classes.controlContainer}>
            <TextField
              id="firstName"
              label="First Name"
              placeholder="First Name"
              margin="normal"
              required
              helperText={
                firstName.error
                  ? 'Invalid first name. First name cannot be empty and should consist of no more than 100 symbols.'
                  : ''
              }
              error={firstName.error}
              value={firstName.value}
              onChange={e => this.handleChange(e.target.id, e.target.value)}
              InputProps={{
                readOnly: !firstName.editable
              }}
              fullWidth
            />

            <TextField
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              margin="normal"
              required
              helperText={
                lastName.error
                  ? 'Invalid last name. Last name cannot be empty and should consist of no more than 100 symbols.'
                  : ''
              }
              error={lastName.error}
              value={lastName.value}
              onChange={e => this.handleChange(e.target.id, e.target.value)}
              InputProps={{
                readOnly: !lastName.editable
              }}
              fullWidth
            />

            <TextField
              id="nickname"
              label="Nickname"
              placeholder="Nickname"
              margin="normal"
              helperText={
                nickname.error
                  ? 'Invalid Nickname. User nickname can contain only letters, digits and underscore or hyphen symbols.'
                  : ''
              }
              error={nickname.error}
              value={nickname.value}
              onChange={e => this.handleChange(e.target.id, e.target.value)}
              InputProps={{
                readOnly: !nickname.editable
              }}
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              helperText={email.error ? 'Invalid Email' : ''}
              margin="normal"
              required
              error={email.error}
              value={email.value}
              InputProps={{
                readOnly: !email.editable
              }}
              onChange={e => this.handleChange(e.target.id, e.target.value)}
              fullWidth
            />
          </div>

          {password.visible && (
            <div>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={8}
                wrap="nowrap"
              >
                <Grid item xs={6}>
                  <Divider />
                </Grid>
                <Grid item>
                  <Typography variant="subheading" color="textSecondary">
                    Security
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Divider />
                </Grid>
              </Grid>

              <div className={classes.controlContainer}>
                <TextField
                  id="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  helperText={
                    password.error
                      ? 'Invalid Password. The password should comply with all strength requirements.'
                      : ''
                  }
                  error={password.error}
                  value={password.value}
                  onChange={e => this.handleChange(e.target.id, e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          aria-label="Toggle password visibility"
                          onClick={this.togglePasswordVisibility}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  id="passwordCheck"
                  placeholder="Password Repeat"
                  margin="normal"
                  fullWidth
                  type="password"
                  helperText={passwordCheck.error ? "Passwords don't match" : ''}
                  error={passwordCheck.error}
                  value={passwordCheck.value}
                  disabled={!password}
                  onChange={e => this.handlePasswordCheck(e.target.value)}
                />
              </div>
            </div>
          )}
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={this.handleAction} fullWidth>
            {actionName}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProfileForm);
