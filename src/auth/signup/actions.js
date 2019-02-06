import { push } from 'connected-react-router';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../actionTypes';
import { unsetTub } from '../../header/navigation/actions';
import SERVICE_PATH from '../../common/service/constants';

const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS, payload: { success: true, error: null } });
const signUpFailed = error => ({ type: SIGN_UP_FAILED, payload: { success: false, error } });

export function signUp() {
  return dispatch => {
    dispatch(unsetTub());
    dispatch(push('/signUp'));
  };
}

export function signUpUser(account) {
  return (dispatch, getState, api) => {
    api
      .post(`${SERVICE_PATH.SECURITY}/auth/sign-up`, JSON.stringify(account))
      .then(response => {
        if (response.success) {
          dispatch(signUpSuccess());
        }
      })
      .catch(error => {
        dispatch(signUpFailed(error.body));
      });
  };
}
