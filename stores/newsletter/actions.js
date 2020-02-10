import {
  SUBMIT_EMAIL_ERROR,
  SUBMIT_EMAIL_STARTED,
  OPEN_NEWSLETTER_MODAL,
  CLOSE_NEWSLETTER_MODAL
} from '@stores/newsletter';
import fetch from 'cross-fetch';

import { trackEvent } from '@utils';

const doSubmitEmail = (email, callback) => async (dispatch, getState) => {
  dispatch({
    type: SUBMIT_EMAIL_STARTED
  });

  try {
    const urlBase = process.env.API_SERVER;
    const url = `${urlBase}/api/subscribe`;
    const data = { email };
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    trackEvent('Get Updates Success');
    if (callback) {
      callback();
    }
  } catch (error) {
    trackEvent('Get Updates Error');
    dispatch({
      type: SUBMIT_EMAIL_ERROR,
      error
    });
  }
};

const openNewsletterModal = () => ({
  type: OPEN_NEWSLETTER_MODAL
});

const closeNewsletterModal = () => ({
  type: CLOSE_NEWSLETTER_MODAL
});

export default {
  doSubmitEmail,
  openNewsletterModal,
  closeNewsletterModal
};
