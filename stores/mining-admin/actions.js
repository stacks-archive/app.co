import * as Constants from './constants';

const fetchingMiningMonths = () => ({
  type: Constants.FETCHING_MINING_MONTHS
});

const fetchedMiningMonths = months => ({
  type: Constants.FETCHED_MINING_MONTHS,
  months
});

const savingMiningMonth = () => ({
  type: Constants.SAVING_MINING_MONTH
});

const savedMiningMonth = () => ({
  type: Constants.SAVED_MINING_MONTH
});

const savingMiningReport = () => ({
  type: Constants.SAVING_MINING_REPORT
});

const savedMiningReport = () => ({
  type: Constants.SAVED_MINING_REPORT
});

const deletingReviewer = () => ({
  type: Constants.DELETING_REVIEWER
});

const deletedReviewer = () => ({
  type: Constants.DELETED_REVIEWER
});

const miningReportError = message => ({
  type: Constants.ERROR_MINING_REPORT,
  message
});

const fetchMiningMonths = () =>
  async function innerFetchMiningMonths(dispatch, getState) {
    dispatch(fetchingMiningMonths());
    const state = getState();
    const { jwt } = state.user;
    const url = `${process.env.API_SERVER}/api/admin/monthly-reports`;
    const response = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${jwt}`
      })
    });
    const { reports } = await response.json();
    dispatch(fetchedMiningMonths(reports));
  };

const saveMonth = month =>
  async function innerSaveMonth(dispatch, getState) {
    dispatch(savingMiningMonth());
    const state = getState();
    const { jwt } = state.user;
    const url = `${process.env.API_SERVER}/api/admin/monthly-reports/${
      month.id
    }`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(month),
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      })
    });
    dispatch(savedMiningMonth());
  };

const saveReport = report =>
  async function innerSaveReport(dispatch, getState) {
    dispatch(savingMiningReport());
    const state = getState();
    const { jwt } = state.user;
    const url = `${process.env.API_SERVER}/api/admin/monthly-reports/${
      report.monthId
    }/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(report),
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      })
    });
    const { success, message } = await response.json();
    if (!success) {
      return dispatch(miningReportError(message));
    }
    return dispatch(savedMiningReport());
  };

const deleteReviewer = reviewer =>
  async function innerDeleteReviewer(dispatch, getState) {
    dispatch(deletingReviewer());
    const state = getState();
    const { jwt } = state.user;
    const url = `${process.env.API_SERVER}/api/admin/monthly-reports/${
      reviewer.reportId
    }/reviewers/${reviewer.id}`;
    await fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${jwt}`
      })
    });
    dispatch(deletedReviewer());
  };

export default {
  fetchMiningMonths,
  saveMonth,
  saveReport,
  deleteReviewer
};
