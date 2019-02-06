import { CHANGE_HEADER_TAB } from '../actionTypes';

const initialState = {
  openedTab: 0
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TAB:
      return { ...state, openedTab: action.openedTab };
    default:
      return state;
  }
};

export default navigation;
