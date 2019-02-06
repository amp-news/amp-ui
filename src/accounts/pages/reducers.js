import { combineReducers } from 'redux';
import admin from './admin/reducers';
import profile from './profile/reducers';

const pages = combineReducers({
  admin,
  profile
});

export default pages;
