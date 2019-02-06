import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import { signUpUser } from './actions';
import styles from './styles';
import ProfileForm, { MODE } from '../../common/components/profile/form';

const SignUpPage = ({ signUp, success, error, classes }) => (
  <Paper className={classes.root}>
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="flex-start"
      className={classes.content}
    >
      <Grid item className={classes.title}>
        <Typography variant="subheading">Sign Up</Typography>
      </Grid>
      <Grid item>
        <ProfileForm
          mode={MODE.NEW}
          success={success}
          error={error}
          actionName="Sign Up"
          actionHandler={signUp}
        />
      </Grid>
    </Grid>
  </Paper>
);

SignUpPage.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.number,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    path: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string)
  }),
  signUp: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  success: state.auth.signUp.success,
  error: state.auth.signUp.error
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUpUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpPage));
