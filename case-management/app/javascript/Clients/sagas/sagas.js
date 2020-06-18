import ClientService from '../../_services/client';
import * as actionTypes from '../constants/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(
    actionTypes.FETCH_SAFETY_ALERTS_API_CALL_REQUEST,
    workerFetchSafetyAlertsSaga
  );
}

// worker saga: makes the api call when watcher saga sees the action
export function* workerFetchSafetyAlertsSaga() {
  try {
    const safetyAlerts = yield call(ClientService.fetchSafetyAlerts);

    // dispatch a success action to the store with the new safetyAlerts
    yield put({
      type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_SUCCESS,
      safetyAlerts,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_FAILURE,
      error,
    });
  }
}
