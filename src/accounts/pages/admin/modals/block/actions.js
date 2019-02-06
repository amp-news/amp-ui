import * as ACTIONS from '../../../../actionTypes';
import SERVICE_PATH from '../../../../../common/service/constants';

const blockAccountConfirm = account => ({
  type: ACTIONS.BLOCK_ACCOUNT_CONFIRM,
  payload: { open: true, user: account }
});
const blockAccountSuccess = () => ({ type: ACTIONS.BLOCK_ACCOUNT_SUCCESS });
const blockAccountUpdate = account => ({ type: ACTIONS.BLOCK_ACCOUNT_UPDATE, account });
const blockAccountEnd = () => ({
  type: ACTIONS.BLOCK_ACCOUNT_END,
  payload: { open: false }
});

export function confirmBlockUser(account) {
  return dispatch => dispatch(blockAccountConfirm(account));
}

export function cancelBlockUser() {
  return dispatch => dispatch(blockAccountEnd());
}

export function blockUser(account) {
  return (dispatch, getState, api) => {
    dispatch(blockAccountUpdate({ ...account, status: 'Inactive' }));

    api
      .patch(
        `${SERVICE_PATH.ACCOUNTS}/users/${account.id}`,
        JSON.stringify({
          status: 'Inactive'
        })
      )
      .then(response => {
        if (response.success) {
          dispatch(blockAccountSuccess());
          dispatch(blockAccountEnd());
        }
      });
  };
}
