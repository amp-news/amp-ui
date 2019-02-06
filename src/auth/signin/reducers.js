import { SIGN_IN, SIGN_IN_END, SIGN_IN_FAILED } from '../actionTypes';
import initial from '../initiaState';

const signIn = (state = initial.signInState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_IN_FAILED:
      return { ...state, error: action.error.messages.length > 0 };
    case SIGN_IN_END:
      return { ...action.payload };
    default:
      return state;
  }
};

export default signIn;
