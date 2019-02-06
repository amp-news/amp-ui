import { EDIT_PROFILE_FAILED, EDIT_PROFILE_SUCCESS } from '../../actionTypes';
import SERVICE_PATH from '../../../common/service/constants';

const editProfileSuccess = () => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: { success: true, error: null }
});
const editProfileFailed = error => ({
  type: EDIT_PROFILE_FAILED,
  payload: { success: false, error }
});

export function editProfile(account) {
  return (dispatch, getState, api) => {
    api
      .patch(`${SERVICE_PATH.ACCOUNTS}/users/${account.id}`, JSON.stringify(account))
      .then(response => {
        if (response.success) {
          dispatch(editProfileSuccess());
        }
      })
      .catch(error => {
        dispatch(editProfileFailed(error.body));
      });
  };
}
