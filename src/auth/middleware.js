import { loginRefresh, signInRefresh, signInRefreshEnd } from './signin/actions';

const MAX_WAITING_REFRESH_ATTEMPTS = 60;

function isTokenExpired({ accessTokenExpiresAt }) {
  return new Date(accessTokenExpiresAt).getTime() - Date.now() < 30000;
}

function shouldRefreshAuth(action, authData, { authenticated, dirty }) {
  return (
    typeof action === 'function' && authenticated && !dirty && authData && isTokenExpired(authData)
  );
}

function waitForRefresh(getState) {
  return new Promise((resolve, reject) => {
    let refreshCount = 0;

    const intervalId = setInterval(() => {
      const {
        auth: {
          security: { authenticated, dirty }
        }
      } = getState();

      if (dirty && refreshCount >= MAX_WAITING_REFRESH_ATTEMPTS) {
        clearInterval(intervalId);
        reject();
      } else {
        clearInterval(intervalId);

        if (authenticated) {
          resolve();
        } else {
          reject();
        }
      }

      refreshCount++;
    }, 500);
  });
}

function refreshAuth({ refreshToken }, dispatch) {
  dispatch(signInRefresh);
  return dispatch(loginRefresh({ refreshToken })).then(() => dispatch(signInRefreshEnd));
}

export default function authMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      auth: { security }
    } = getState();

    const authData = JSON.parse(localStorage.getItem('auth-data'));

    if (shouldRefreshAuth(action, authData, security)) {
      if (security.dirty) {
        return waitForRefresh(getState)
          .then(() => next(action))
          .catch(() => null);
      }

      return refreshAuth(authData, dispatch)
        .then(() => next(action))
        .catch(() => null);
    }

    return next(action);
  };
}
