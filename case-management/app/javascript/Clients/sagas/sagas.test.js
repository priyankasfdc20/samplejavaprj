import ClientService from '../../_services/client';

import watcherSaga, { workerFetchSafetyAlertsSaga } from './sagas';
import * as actionTypes from '../constants/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

ClientService.fetchSafetyAlerts();

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = watcherSaga();
    expect(gen.next().value).toEqual(
      takeLatest(
        actionTypes.FETCH_SAFETY_ALERTS_API_CALL_REQUEST,
        workerFetchSafetyAlertsSaga
      )
    );
  });

  describe('#workerFetchSafetyAlertsSaga', () => {
    beforeEach(() => {
      ClientService.fetchSafetyAlerts = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = workerFetchSafetyAlertsSaga();
        expect(gen.next().value).toEqual(call(ClientService.fetchSafetyAlerts));
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_SUCCESS,
            safetyAlerts: [1234, 5678],
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = workerFetchSafetyAlertsSaga();
        expect(gen.next().value).toEqual(call(ClientService.fetchSafetyAlerts));
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
