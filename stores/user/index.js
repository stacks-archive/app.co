import * as blockstack from 'blockstack';

const initialState = {
  userId: null,
  jwt: null,
  signingIn: false,
};

const constants = {
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  SIGN_IN: 'SIGN_IN',
};

const signingIn = () => ({
  type: constants.SIGNING_IN,
});

const signedIn = (data) => ({
  type: constants.SIGNED_IN,
  token: data.token,
});

const handleSignIn = (apiServer) =>
  async function innerHandleSignIn(dispatch) {
    const token = blockstack.getAuthResponseToken();
    if (!token) {
      return true;
    }

    dispatch(signingIn());
    const url = `${apiServer}/api/authenticate?authToken=${token}`;
    const response = await fetch(url, {
      method: 'POST',
    });
    const json = await response.json();
    console.log(json);
    dispatch(signedIn(json));

    return true;
  };

const signIn = () => {
  const redirect = `${window.location.origin}/admin`;
  const manifest = `${window.location.origin}/static/manifest.json`;
  blockstack.redirectToSignIn(redirect, manifest);
  return signingIn();
};

const actions = {
  handleSignIn,
  signIn,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGNING_IN:
      return Object.assign({}, state, {
        signingIn: true,
      });
    case constants.SIGNED_IN:
      return Object.assign({}, state, {
        signingIn: false,
        jwt: action.token,
      });
    default:
      return state;
  }
};

export default {
  actions,
  reducer,
};
