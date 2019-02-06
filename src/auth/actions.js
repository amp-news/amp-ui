import * as SignInActions from './signin/actions';
import * as SignUpActions from './signup/actions';
import { SEC_SET_USER, SEC_UNSET_USER } from './actionTypes';
import SERVICE_PATH from '../common/service/constants';

const securitySetUser = user => ({
  type: SEC_SET_USER,
  payload: {
    authenticated: true,
    user
  }
});

const securityUnSetUser = () => ({
  type: SEC_UNSET_USER,
  payload: {
    authenticated: false,
    user: null
  }
});

function setSignedInUser() {
  return (dispatch, getState, api) => {
    api.get(`${SERVICE_PATH.SECURITY}/auth/current`).then(response => {
      if (response.success) {
        dispatch(securitySetUser(response.data));
      }
    });
  };
}

function unSetSignedInUser() {
  return dispatch => {
    dispatch(securityUnSetUser());
  };
}

const SecurityActions = {
  setSignedInUser,
  unSetSignedInUser
};

export default {
  ...SecurityActions,
  ...SignInActions,
  ...SignUpActions
};
