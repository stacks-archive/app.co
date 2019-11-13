import { Dispatch } from 'redux'
import { UserSession, AppConfig } from 'blockstack';
import Cookies from 'js-cookie';

const host =
  typeof document === 'undefined' ? 'https://app.co' : document.location.origin;
const appConfig = new AppConfig(['store_write'], host);
export const userSession = new UserSession({ appConfig });

const initialState = {
  userId: null,
  jwt: null,
  signingIn: false,
  user: null
};

const constants = {
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  SIGN_IN: 'SIGN_IN',
  SIGNING_OUT: 'SIGNING_OUT'
};

const signingIn = () => ({
  type: constants.SIGNING_IN
});

const signedIn = (data: any) => ({
  type: constants.SIGNED_IN,
  payload: {
    token: data.token,
    user: data.user,
    userId: data.user.id
  }
});

const signOut = () => {
  Cookies.remove('jwt');
  return {
    type: constants.SIGNING_OUT
  };
};

const handleSignIn = (apiServer: string) => async (dispatch: Dispatch) => {
  const token = userSession.getAuthResponseToken();
  if (!token) {
    return true;
  }
  if (userSession.isUserSignedIn()) {
    userSession.signUserOut();
  }
  dispatch(signingIn());
  await userSession.handlePendingSignIn();
  const url = `${apiServer}/api/authenticate?authToken=${token}`;
  const response = await fetch(url, {
    method: 'POST'
  });
  const json = await response.json();
  dispatch(signedIn(json));
  const cookie = Cookies.get('jwt');
  if (!cookie) {
    Cookies.set('jwt', json.token);
    // next.js relies on cookie to render data
    window.location.reload();
  }
  return true;
};

const signIn = (redirectPath = 'admin') => {
  const redirect = `${window.location.origin}/${redirectPath}`;
  const manifest = `${window.location.origin}/static/manifest.json`;
  userSession.redirectToSignIn(redirect, manifest);
  return signingIn();
};

const actions = {
  handleSignIn,
  signIn,
  signOut
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SIGNING_IN:
      return {
        ...state,
        signingIn: true
      };
    case constants.SIGNED_IN:
      return {
        ...state,
        signingIn: false,
        jwt: payload.token,
        userId: payload.userId,
        user: payload.user
      };
    case constants.SIGNING_OUT:
      return { ...state, user: null, userId: null, jwt: null };
    default:
      return state;
  }
};

export default {
  actions,
  reducer
};
