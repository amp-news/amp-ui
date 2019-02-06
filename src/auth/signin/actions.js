import { push } from 'connected-react-router';
import {
  SIGN_IN_END,
  SIGN_IN_FAILED,
  SEC_SIGN_IN_REFRESH,
  SEC_SIGN_IN_REFRESH_END
} from '../actionTypes';
import SecurityActions from '../actions';
import { toDefaultTab } from '../../header/navigation/actions';
import { AUTH_TYPE, signInExternal } from './external';
import SERVICE_PATH from '../../common/service/constants';

export const signInRefresh = {
  type: SEC_SIGN_IN_REFRESH,
  payload: {
    dirty: true
  }
};

export const signInRefreshEnd = {
  type: SEC_SIGN_IN_REFRESH_END,
  payload: {
    dirty: false
  }
};

const signInFailed = error => ({
  type: SIGN_IN_FAILED,
  error
});

const signInEnd = {
  type: SIGN_IN_END,
  payload: {
    open: false,
    error: false
  }
};

function handleSignInRefresh(token, dispatch) {
  localStorage.setItem('auth-data', JSON.stringify(token));
  dispatch(SecurityActions.setSignedInUser());
}

function handleSignInResponse(token, dispatch) {
  handleSignInRefresh(token, dispatch);
  dispatch(signInEnd);
  dispatch(toDefaultTab());
  dispatch(push('/news'));
}

export function login(credentials) {
  return (dispatch, getState, api) => {
    api
      .makeRequest(`${SERVICE_PATH.SECURITY}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      .then(response => handleSignInResponse(response.data, dispatch))
      .catch(error => {
        dispatch(signInFailed(error.body));
        dispatch(SecurityActions.unSetSignedInUser());
      });
  };
}

export function loginWithGoogle() {
  return (dispatch, getState, api) => {
    signInExternal(`${api.baseURI}${SERVICE_PATH.SECURITY}/auth/external/google`, AUTH_TYPE.GOOGLE)
      .then(token => handleSignInResponse(token, dispatch))
      .catch(() => {
        dispatch(SecurityActions.unSetSignedInUser());
      });
  };
}

export function loginRefresh(refreshCredentials) {
  return (dispatch, getState, api) =>
    api
      .makeRequest(`${SERVICE_PATH.SECURITY}/auth/sign-in-refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(refreshCredentials)
      })
      .then(response => {
        handleSignInRefresh(response.data, dispatch);
      })
      .catch(() => {
        localStorage.removeItem('auth-data');
        dispatch(SecurityActions.unSetSignedInUser());
        dispatch(toDefaultTab());
        dispatch(push('/news'));
      });
}

export function loginCancel() {
  return dispatch => dispatch(signInEnd);
}
