import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBox from '@material-ui/icons/AccountBox';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar/Avatar';
import LoginForm from '../../auth/signin/form';
import { signIn, signOut, toMyProfile } from './actions';
import styles from './styles';

const HeaderToolbar = ({ security, handleSignIn, handleSignOut, handleMyProfile, classes }) => (
  <Toolbar>
    <Grid container alignItems="center" direction="row" justify="space-between" className={classes.root}>
      <Grid item>
        <Grid container alignItems="center" direction="row" justify="flex-start" spacing={8}>
          <Grid item>
            <Avatar alt="JMP" src="/images/logo.png" className={classes.logo} />
          </Grid>
          <Grid item>
            <Typography variant="display1" color="inherit" className={classes.title}>
              JMP
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {security.authenticated ? (
          <Grid container alignItems="flex-start" direction="row" justify="space-between">
            <Grid item>
              <Typography variant="subheading" color="inherit" className={classes.title}>
                {`${security.user.firstName} ${security.user.lastName}`}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-start" direction="row" justify="center">
                <Grid item>
                  <IconButton className={classes.actionIcon} onClick={handleMyProfile}>
                    <Tooltip title="Profile" enterDelay={150}>
                      <AccountBox />
                    </Tooltip>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton className={classes.actionIcon} onClick={handleSignOut}>
                    <Tooltip title="Log Out" enterDelay={150}>
                      <ExitToApp />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div>
            <IconButton className={classes.actionIcon} onClick={handleSignIn}>
              <Tooltip title="Sign In" enterDelay={150}>
                <AccountCircle />
              </Tooltip>
            </IconButton>
            <LoginForm />
          </div>
        )}
      </Grid>
    </Grid>
  </Toolbar>
);

HeaderToolbar.propTypes = {
  security: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickname: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string
    })
  }).isRequired,
  handleSignIn: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  handleMyProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.auth.security
});

const mapDispatchToProps = dispatch => ({
  handleSignIn: bindActionCreators(signIn, dispatch),
  handleSignOut: bindActionCreators(signOut, dispatch),
  handleMyProfile: bindActionCreators(toMyProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderToolbar));
