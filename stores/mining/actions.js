import fetch from 'cross-fetch';
import {
  SUBMIT_APP_STARTED,
  SUBMIT_APP_FINISHED,
  SUBMIT_APP_ERROR
} from './constants';

const submittingApp = () => ({
  type: SUBMIT_APP_STARTED
});

const submittingAppError = () => ({
  type: SUBMIT_APP_ERROR
});

const submittedApp = () => ({
  type: SUBMIT_APP_FINISHED
});

const submitApp = submission => async dispatch => {
  dispatch(submittingApp());
  try {
    const url = `${process.env.API_SERVER}/api/app-mining-submission`;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    });
    dispatch(submittedApp());
  } catch (error) {
    dispatch(submittingAppError());
    throw Error(error);
  }
};

export default {
  submitApp
};
