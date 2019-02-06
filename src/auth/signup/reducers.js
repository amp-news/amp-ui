import { SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../actionTypes';

const signUp = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default signUp;
