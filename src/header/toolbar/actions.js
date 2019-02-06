import { push } from 'connected-react-router';
import SecurityActions from '../../auth/actions';
import { SIGN_IN } from '../../auth/actionTypes';
import { unsetTub } from '../navigation/actions';
import SERVICE_PATH from '../../common/service/constants';

const signInStart = () => ({
  type: SIGN_IN,
  payload: {
    open: true
  }
});

export function signIn() {
  return dispatch => {
    dispatch(signInStart());
  };
}

export function signOut() {
  return (dispatch, getState, api) => {
    api
      .post(`${SERVICE_PATH.SECURITY}/auth/sign-out`)
      .then(response => {
        if (response.success) {
          localStorage.removeItem('auth-data');
          dispatch(SecurityActions.unSetSignedInUser());
          dispatch(push('/news'));
        }
      })
      .catch();
  };
}

export function toMyProfile() {
  return dispatch => {
    dispatch(unsetTub());
    dispatch(push('/profile'));
  };
}
