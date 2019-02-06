import articleListReducers from '../list/articleListReducers';
import articleReducers from '../item/articleReducers';
import articleEditReducers from '../edit/articleEditReducers';

export default (state, action) => {
  let nextState = state;
  nextState = articleListReducers(nextState, action);
  nextState = articleReducers(nextState, action);
  nextState = articleEditReducers(nextState, action);
  return nextState;
};
