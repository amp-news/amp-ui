import * as ACTIONS from '../../../../actionTypes';
import { loadUsers } from '../../actions';
import SERVICE_PATH from '../../../../../common/service/constants';

const deleteAccountConfirm = account => ({
  type: ACTIONS.DELETE_ACCOUNT_CONFIRM,
  payload: { open: true, user: account }
});
const deleteAccountEnd = () => ({ type: ACTIONS.DELETE_ACCOUNT_END, payload: { open: false } });

export function confirmDeleteUser(account) {
  return dispatch => dispatch(deleteAccountConfirm(account));
}

export function cancelDeleteUser() {
  return dispatch => dispatch(deleteAccountEnd());
}

export function deleteUser(account) {
  return (dispatch, getState, api) => {
    api.delete(`${SERVICE_PATH.ACCOUNTS}/users/${account.id}`).then(response => {
      if (response.success) {
        dispatch(deleteAccountEnd());
        dispatch(loadUsers());
      }
    });
  };
}
