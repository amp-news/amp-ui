import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Zoom from '@material-ui/core/Zoom/Zoom';
import Grid from '@material-ui/core/Grid/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import ErrorIcon from '@material-ui/icons/Error';
import { login, loginCancel, loginWithGoogle } from './actions';
import styles, { GoogleIcon } from './styles';
import { signUp } from '../signup/actions';

class LoginForm extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    toSignUp: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signInGoogle: PropTypes.func.isRequired,
    signInCancel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      email: {
        error: false
      },
      password: {
        error: false
      }
    };
  }

  handleSignIn = () => {
    const { signIn } = this.props;

    if (this.validate()) {
      const { email, password } = this.state;

      signIn({
        email: email.value,
        password: password.value
      });
    }
  };

  handleCancel = () => {
    const { signInCancel } = this.props;

    this.setState(
      {
        showPassword: false,
        error: false,
        email: {
          error: false,
          value: ''
        },
        password: {
          error: false,
          value: ''
        }
      },
      signInCancel
    );
  };

  validate = () => {
    const { email, password } = this.state;

    let valid = true;

    if (!email.value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      email.error = true;
      valid = false;
    }
    if (
      !password.value ||
      !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})/.test(password.value)
    ) {
      password.error = true;
      valid = false;
    }

    if (!valid) {
      this.setState(prevState => ({
        ...prevState,
        email,
        password
      }));
    }

    return valid;
  };

  handleEmailChange = email => {
    this.setState(prevState => ({
      ...prevState,
      email: {
        error: false,
        value: email
      }
    }));
  };

  handlePasswordChange = password => {
    this.setState(prevState => ({
      ...prevState,
      password: {
        error: false,
        value: password
      }
    }));
  };

  togglePasswordVisibility = event => {
    event.preventDefault();
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSignUp = () => {
    const { toSignUp, signInCancel } = this.props;

    toSignUp();
    signInCancel();
  };

  render() {
    const { open, error, signInGoogle, classes } = this.props;
    const { email, password, showPassword } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Zoom}
        maxWidth="xs"
        keepMounted
      >
        <AppBar position="static">
          <DialogTitle id="form-dialog-title" className={classes.header}>
            <Grid container alignItems="center" direction="row" justify="space-between">
              <Grid item>
                <Typography variant="title" color="primary" className={classes.title}>
                  Welcome to JMP
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={this.handleCancel}
                  className={classes.closeIcon}
                  aria-label="Close"
                >
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
        </AppBar>
        <DialogContent className={classes.content}>
          <TextField
            id="credentials-email"
            label="Email"
            placeholder="Email"
            margin="normal"
            error={email ? error || email.error : false}
            value={email ? email.value : ''}
            helperText={email && !error && email.error ? 'Invalid Email' : ''}
            onChange={e => this.handleEmailChange(e.target.value)}
            fullWidth
          />
          <TextField
            id="credentials-password"
            label="Password"
            placeholder="Password"
            margin="normal"
            fullWidth
            error={password ? error || password.error : false}
            value={password ? password.value : ''}
            helperText={password && !error && password.error ? 'Invalid Password.' : ''}
            type={showPassword ? 'text' : 'password'}
            onChange={e => this.handlePasswordChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disableRipple
                    aria-label="Toggle password visibility"
                    onClick={this.togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Grid
            container
            alignItems="stretch"
            direction="column"
            justify="space-between"
            spacing={8}
          >
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.signInButton}
                onClick={this.handleSignIn}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={8}
                wrap="nowrap"
              >
                <Grid item xs={10}>
                  <Divider />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">OR</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Divider />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                aria-label="Sign In With Google"
                onClick={signInGoogle}
              >
                <Grid container direction="row" alignItems="center" justify="center" spacing={8}>
                  <Grid item>
                    <GoogleIcon />
                  </Grid>
                  <Grid item>Sign In with Google</Grid>
                </Grid>
              </Button>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center" justify="center" spacing={8}>
                <Grid item>
                  <Typography variant="caption">Not registered in JMP?</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    color="primary"
                    aria-label="Sign Up"
                    size="small"
                    onClick={this.handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  open: state.auth.signIn.open,
  error: state.auth.signIn.error
});

const mapDispatchToProps = dispatch => ({
  toSignUp: bindActionCreators(signUp, dispatch),
  signIn: bindActionCreators(login, dispatch),
  signInGoogle: bindActionCreators(loginWithGoogle, dispatch),
  signInCancel: bindActionCreators(loginCancel, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginForm));
