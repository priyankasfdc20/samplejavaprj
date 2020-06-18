import Client from '../../_services/client';
import * as actionTypes from '../constants/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

export default function* fetchRelatedClientsSaga() {
  yield takeLatest(
    actionTypes.FETCH_RELATED_CLIENTS_API_CALL_REQUEST,
    fetchRelatedClients
  );
}

export function* fetchRelatedClients() {
  try {
    const clientId = 'DZGcEEgaa1';
    const relatedClients = yield call(
      Client.getRelatedClientsByChildClientId,
      clientId
    );

    yield put({
      type: actionTypes.FETCH_RELATED_CLIENTS_API_CALL_SUCCESS,
      relatedClients,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_RELATED_CLIENTS_API_CALL_FAILURE,
      error,
    });
  }
}
