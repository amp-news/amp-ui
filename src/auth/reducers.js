import { combineReducers } from 'redux';
import signIn from './signin/reducers';
import signUp from './signup/reducers';
import initial from './initiaState';
import {
  SEC_SET_USER,
  SEC_SIGN_IN_REFRESH,
  SEC_SIGN_IN_REFRESH_END,
  SEC_UNSET_USER
} from './actionTypes';

const security = (state = initial.securityState, action) => {
  switch (action.type) {
    case SEC_SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case SEC_UNSET_USER:
      return {
        ...state,
        ...action.payload
      };
    case SEC_SIGN_IN_REFRESH:
      return {
        ...state,
        ...action.payload
      };
    case SEC_SIGN_IN_REFRESH_END:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const auth = combineReducers({
  signIn,
  signUp,
  security
});

export default auth;
