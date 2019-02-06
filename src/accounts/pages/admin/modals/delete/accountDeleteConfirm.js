import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelDeleteUser, deleteUser } from './actions';

const AccountDeleteConfirm = ({ open, user, handleYes, handleNo }) =>
  !user ? null : (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick
    >
      <DialogTitle id="alert-dialog-title">Deletion Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to Delete user {`${user.firstName} ${user.lastName}`} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleYes(user)} color="primary" autoFocus>
          Yes
        </Button>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );

AccountDeleteConfirm.propTypes = {
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
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired
};

AccountDeleteConfirm.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.account.pages.admin.delete.user,
  open: state.account.pages.admin.delete.open
});

const mapDispatchToProps = dispatch => ({
  handleYes: bindActionCreators(deleteUser, dispatch),
  handleNo: bindActionCreators(cancelDeleteUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDeleteConfirm);
