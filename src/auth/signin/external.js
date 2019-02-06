import SERVICE_PATH from '../../common/service/constants';

export const AUTH_TYPE = Object.freeze({
  GOOGLE: 'Google'
});
const MAX_POLLING_ATTEMPTS = 150000;
const TOKEN_REDIRECT_URI = `${SERVICE_PATH.SECURITY}/auth/token-retrieve`;
const POPUP_OPTIONS = {
  width: 500,
  height: 600,
  menubar: 'no',
  toolbar: 'no',
  location: 'no',
  resizable: 'yes',
  scrollbars: 'yes'
};

function stringifyOptions(options) {
  return Object.entries(options)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(',');
}

function centerPosition(width, height) {
  const dualScreenLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop ? window.screenTop : window.screenY;

  const parentWidth = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
  const parentHeight = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

  return {
    left: parentWidth / 2 - width / 2 + dualScreenLeft,
    top: parentHeight / 2 - height / 2 + dualScreenTop
  };
}

function retrieveToken(href) {
  const url = new URL(href);
  const params = url.searchParams;

  return {
    accessToken: params.get('access_token'),
    accessTokenType: params.get('access_token_type'),
    accessTokenExpiresAt: params.get('access_token_expires_at'),
    refreshToken: params.get('refresh_token')
  };
}

export function signInExternal(url, authType) {
  return new Promise((resolve, reject) => {
    const popupOptions = {
      ...POPUP_OPTIONS,
      ...centerPosition(POPUP_OPTIONS.width, POPUP_OPTIONS.height)
    };

    const name = `Sign In: ${authType}`;
    const popup = window.open(url, name, stringifyOptions(popupOptions));
    popup.document.title = name;
    popup.focus();

    let pollAttempt = 0;
    const pollTimer = window.setInterval(() => {
      try {
        const popupURL = popup.document.URL;

        if (popupURL.indexOf(TOKEN_REDIRECT_URI) !== -1) {
          window.clearInterval(pollTimer);
          popup.close();
          resolve(retrieveToken(popupURL));
        }
      } catch (e) {}

      if (pollAttempt === MAX_POLLING_ATTEMPTS) {
        window.clearInterval(pollTimer);
        popup.close();
        reject();
      }

      pollAttempt++;
    }, 500);
  });
}
