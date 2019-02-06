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
import { blockUser, cancelBlockUser } from './actions';

const AccountBlockConfirm = ({ open, user, handleYes, handleNo }) =>
  !user ? null : (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick
    >
      <DialogTitle id="alert-dialog-title">Blocking Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to Block user {`${user.firstName} ${user.lastName}`} ?
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

AccountBlockConfirm.propTypes = {
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

AccountBlockConfirm.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.account.pages.admin.block.user,
  open: state.account.pages.admin.block.open
});

const mapDispatchToProps = dispatch => ({
  handleYes: bindActionCreators(blockUser, dispatch),
  handleNo: bindActionCreators(cancelBlockUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountBlockConfirm);
