import { combineReducers } from 'redux';
import navigation from './navigation/reducers';

const header = combineReducers({
  navigation
});

export default header;
