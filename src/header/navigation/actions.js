import { CHANGE_HEADER_TAB } from '../actionTypes';

const changeTab = openedTab => ({
  type: CHANGE_HEADER_TAB,
  openedTab
});

export function toTab(openedTab) {
  return dispatch => {
    dispatch(changeTab(openedTab));
  };
}

export function toDefaultTab() {
  return toTab(0);
}

export function unsetTub() {
  return toTab(-1);
}
