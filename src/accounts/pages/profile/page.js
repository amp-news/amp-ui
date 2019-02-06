import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import { editProfile } from './actions';
import styles from './styles';
import ProfileForm, { MODE } from '../../../common/components/profile/form';

const ProfilePage = ({ saveProfile, user, success, error, classes }) => (
  <Paper className={classes.root}>
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="flex-start"
      className={classes.content}
    >
      <Grid item className={classes.title}>
        <Typography variant="subheading">My Profile</Typography>
      </Grid>
      <Grid item>
        <ProfileForm
          mode={MODE.EDIT}
          actionName="Save"
          success={success}
          error={error}
          actionHandler={saveProfile}
          user={user}
        />
      </Grid>
    </Grid>
  </Paper>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  error: PropTypes.shape({
    code: PropTypes.number,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    path: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string)
  }),
  success: PropTypes.bool,
  saveProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.security.user,
  success: state.account.pages.profile.success,
  error: state.account.pages.profile.error
});

const mapDispatchToProps = dispatch => ({
  saveProfile: bindActionCreators(editProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfilePage));
