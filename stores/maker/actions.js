export const SET_LOADING_DONE = 'maker-page/SET_LOADING_DONE';
export const MAKER_AUTH_ERROR = 'maker-page/MAKER_AUTH_ERROR';

export const SET_PAYMENT_DETAILS_COMPLETE =
  'maker-page/SET_PAYMENT_DETAILS_COMPLETE';
export const SAVE_PAYMENT_DETAILS = 'maker-page/SAVE_PAYMENT_DETAILS';
export const SAVE_PAYMENT_DETAILS_DONE = 'maker-page/SAVE_PAYMENT_DETAILS_DONE';
export const SAVE_PAYMENT_DETAILS_FAIL = 'maker-page/SAVE_PAYMENT_DETAILS_FAIL';

export const SET_KYC_COMPLETE = 'maker-page/SET_KYC_COMPLETE';
export const SET_LEGAL_COMPLETE = 'maker-page/SET_LEGAL_COMPLETE';

export const FETCH_APPS = 'maker-page/FETCH_APPS';
export const FETCH_APPS_DONE = 'maker-page/FETCH_APPS_DONE';
export const FETCH_APPS_FAIL = 'maker-page/FETCH_APPS_FAIL';

export const SELECT_APP = 'maker-page/SELECT_APP';

export const errorAction = () => ({ type: MAKER_AUTH_ERROR });
export const setLoadingDoneAction = () => ({ type: SET_LOADING_DONE });
export const savePaymentDetailsAction = () => ({ type: SAVE_PAYMENT_DETAILS });
export const savePaymentDetailsDoneAction = addresses => ({
  type: SAVE_PAYMENT_DETAILS_DONE,
  payload: addresses
});
export const savePaymentDetailsFailAction = () => ({
  type: SAVE_PAYMENT_DETAILS_FAIL
});

export const setKycComplete = () => ({ type: SET_KYC_COMPLETE });
export const setLegalComplete = () => ({ type: SET_LEGAL_COMPLETE });

export const fetchAppsAction = () => ({ type: FETCH_APPS });

export const fetchAppsDoneAction = payload => ({
  type: FETCH_APPS_DONE,
  payload
});

export const fetchAppsFailAction = () => ({ type: FETCH_APPS_FAIL });

export const selectAppAction = payload => ({ type: SELECT_APP, payload });

export const savePaymentDetails = ({
  appId,
  jwt,
  btcAddress,
  stxAddress
}) => async dispatch => {
  dispatch(savePaymentDetailsAction());
  try {
    const response = await fetch(
      `${process.env.API_SERVER}/api/maker/apps?appId=${appId}`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${jwt}`
        }),
        body: JSON.stringify({
          BTCAddress: btcAddress,
          stacksAddress: stxAddress
        })
      }
    );
    await response.json();
    dispatch(savePaymentDetailsDoneAction({ appId, btcAddress, stxAddress }));
  } catch (error) {
    dispatch(savePaymentDetailsFailAction(error));
  }
};

export const fetchApps = ({ user }) => async dispatch => {
  if (!(user && user.jwt)) {
    dispatch(errorAction());
    return;
  }

  dispatch(fetchAppsAction());
  try {
    const uri = `${process.env.API_SERVER}/api/maker/apps`;
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    });
    const data = await response.json();
    await dispatch(fetchAppsDoneAction(data));
  } catch (error) {
    dispatch(fetchAppsFailAction());
  }
};
