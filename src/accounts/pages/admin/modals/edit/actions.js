import API from '../../../../../common/service/api';
import * as ACTIONS from '../../../../actionTypes';
import SERVICE_PATH from '../../../../../common/service/constants';

const editAccountDialog = (account, roles, statuses) => ({
  type: ACTIONS.EDIT_ACCOUNT_DIALOG,
  payload: { open: true, user: account, roles, statuses }
});
const editUserUpdate = account => ({ type: ACTIONS.EDIT_ACCOUNT_UPDATE, account });
const editAccountSuccess = () => ({ type: ACTIONS.EDIT_ACCOUNT_SUCCESS });
const editAccountEnd = () => ({
  type: ACTIONS.EDIT_ACCOUNT_END,
  payload: { open: false }
});

function fetchRoles() {
  return API.get(`${SERVICE_PATH.ACCOUNTS}/roles`).then(response => response.data);
}

function fetchStatuses() {
  return API.get(`${SERVICE_PATH.ACCOUNTS}/statuses`).then(response => response.data);
}

function getEditSettings() {
  return Promise.all([fetchRoles(), fetchStatuses()]);
}

export function openEditUserDialog(account) {
  return dispatch => {
    getEditSettings().then(([roles, statuses]) =>
      dispatch(editAccountDialog(account, roles, statuses))
    );
  };
}

export function updateEditUser(account) {
  return dispatch => dispatch(editUserUpdate(account));
}

export function cancelEditUser() {
  return dispatch => dispatch(editAccountEnd());
}

export function editUser(account) {
  return (dispatch, getState, api) => {
    api
      .patch(
        `${SERVICE_PATH.ACCOUNTS}/users/${account.id}`,
        JSON.stringify({ status: account.status, role: account.role })
      )
      .then(response => {
        if (response.success) {
          dispatch(editAccountSuccess());
          dispatch(editAccountEnd());
        }
      });
  };
}
