import { combineReducers } from 'redux';
import pages from './pages/reducers';

const accountsRoot = combineReducers({
  pages
});

export default accountsRoot;
