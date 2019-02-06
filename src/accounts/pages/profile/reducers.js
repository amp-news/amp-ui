import { EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILED } from '../../actionTypes';

const profile = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case EDIT_PROFILE_FAILED:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default profile;
