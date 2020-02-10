import { REHYDRATE } from 'redux-persist';
import { UserSession, AppConfig } from 'blockstack';
import Cookies from 'js-cookie';

const host =
  typeof document === 'undefined' ? 'https://app.co' : document.location.origin;
const appConfig = new AppConfig(['store_write'], host);
export const userSession = new UserSession({ appConfig });

const constants = {
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  SIGN_IN: 'SIGN_IN',
  SIGNING_OUT: 'SIGNING_OUT'
};

const signingIn = () => ({
  type: constants.SIGNING_IN
});

const signOut = () => {
  Cookies.remove('jwt');
  return {
    type: constants.SIGNING_OUT
  };
};

const signIn = (redirectPath = 'admin') => {
  const redirect = `${window.location.origin}/${redirectPath}`;
  const manifest = `${window.location.origin}/static/manifest.json`;
  userSession.redirectToSignIn(redirect, manifest);
  return signingIn();
};

const actions = {
  signIn,
  signOut
};

interface UserState {
  userId: string | null;
  jwt: string | null;
  signingIn: boolean;
  user?: {
    blockstackUsername: string;
  };
}

const initialState: UserState = {
  userId: null,
  jwt: null,
  signingIn: false,
  user: {
    blockstackUsername: ''
  }
};

const makeUserReducer = (serverState: any = {}) => {

  const serverInitialState = {
    ...initialState,
    jwt: serverState && serverState.token,
    user: serverState && serverState.user,
    userId: serverState && serverState.user && serverState.user.id
  };

  return (state = serverInitialState, { type, payload }) => {
    switch (type) {

      case REHYDRATE: {
        if (state.jwt && state.userId) {
          return { ...state };
        }
        if (!Cookies.get('jwt')) {
          return { ...initialState };
        }
        if (payload && payload.user) {
          return { ...payload.user };
        }
        return { ...state };
      }

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
};


export default {
  actions,
  makeUserReducer
};
