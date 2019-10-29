export const SET_LOADING_DONE = '[Maker Page] SET_LOADING_DONE'
export const MAKER_AUTH_ERROR = '[Maker Page] MAKER_AUTH_ERROR'

export const SET_PAYMENT_DETAILS_COMPLETE = '[Maker Page] SET_PAYMENT_DETAILS_COMPLETE'
export const SAVE_PAYMENT_DETAILS = '[Maker Page] SAVE_PAYMENT_DETAILS'
export const SAVE_PAYMENT_DETAILS_DONE = '[Maker Page] SAVE_PAYMENT_DETAILS_DONE'
export const SAVE_PAYMENT_DETAILS_FAIL = '[Maker Page] SAVE_PAYMENT_DETAILS_FAIL'

export const SET_KYC_COMPLETE = '[Maker Page] SET_KYC_COMPLETE'
export const SET_LEGAL_COMPLETE = '[Maker Page] SET_LEGAL_COMPLETE'

export const FETCH_APPS = '[Maker Page] FETCH_APPS'
export const FETCH_APPS_DONE = '[Maker Page] FETCH_APPS_DONE'
export const FETCH_APPS_FAIL = '[Maker Page] FETCH_APPS_FAIL'

export const SELECT_APP = '[Maker Page] SELECT_APP'

export const errorAction = () => ({ type: MAKER_AUTH_ERROR })
export const setLoadingDoneAction = () => ({ type: SET_LOADING_DONE })
export const savePaymentDetailsAction = () => ({ type: SAVE_PAYMENT_DETAILS })
export const savePaymentDetailsDoneAction = addresses => ({
  type: SAVE_PAYMENT_DETAILS_DONE,
  payload: addresses
})
export const savePaymentDetailsFailAction = () => ({ type: SAVE_PAYMENT_DETAILS_FAIL })

export const setKycComplete = () => ({ type: SET_KYC_COMPLETE })
export const setLegalComplete = () => ({ type: SET_LEGAL_COMPLETE })

export const fetchAppsAction = () => ({ type: FETCH_APPS })
export const fetchAppsDoneAction = payload => ({ type: FETCH_APPS_DONE, payload })
export const fetchAppsFailAction = () => ({ type: FETCH_APPS_FAIL })

export const selectAppAction = payload => ({ type: SELECT_APP, payload })

export const savePaymentDetails = ({ apiServer, appId, jwt, btcAddress, stxAddress }) => async dispatch => {
  dispatch(savePaymentDetailsAction())
  try {
    const response = await fetch(`${apiServer}/api/maker/apps?appId=${appId}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`
      }),
      body: JSON.stringify({
        BTCAddress: btcAddress,
        stacksAddress: stxAddress
      })
    })
    await response.json()
    dispatch(savePaymentDetailsDoneAction({ appId, btcAddress, stxAddress }))
  } catch (error) {
    dispatch(savePaymentDetailsFailAction(error))
  }
}

export const fetchApps = ({ user, apiServer }) => async dispatch => {
  if (!(user && user.jwt)) {
    dispatch(errorAction())
    return
  }
  dispatch(fetchAppsAction())
  try {
    const uri = `${apiServer}/api/maker/apps`
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })
    const apps = await response.json()
    await dispatch(fetchAppsDoneAction(apps))
  } catch (error) {
    dispatch(fetchAppsFailAction())
  }
}
