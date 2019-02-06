import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import news from '../news/common/newsRootReducer';
import header from '../header/reducers';
import jmp from '../jmp/reducers/jmp';
import auth from '../auth/reducers';
import account from '../accounts/reducers';
import subscriptions from '../subscription/reducers';

// import and add your reducers here. Combine reducer should have the same structure as state
const allReducers = {
  auth,
  account,
  news,
  header,
  jmp,
  subscriptions,
  notifications
};

export default combineReducers(allReducers);
