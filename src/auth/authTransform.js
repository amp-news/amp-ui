import { createTransform } from 'redux-persist';
import initial from './initiaState';

const initialState = {
  security: initial.securityState,
  signIn: initial.signInState
};

function processAuthState(state) {
  const authData = JSON.parse(localStorage.getItem('auth-data'));

  if (authData === null) {
    return { ...initialState };
  }

  return { ...state };
}

const authTransform = createTransform(processAuthState, processAuthState, { whitelist: ['auth'] });

export default authTransform;
