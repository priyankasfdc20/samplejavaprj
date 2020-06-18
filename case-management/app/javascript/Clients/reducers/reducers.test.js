import reducer from './reducers';
import * as actionTypes from '../constants/actionTypes';

describe('reducer', () => {
  it('handles FETCH_SAFETY_ALERTS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_REQUEST,
    };
    const state = { safetyAlerts: null, fetching: false };
    expect(reducer(state, requestAction)).toEqual({
      fetchSafetyAlerts: {
        fetching: true,
        safetyAlerts: null,
        error: null,
      },
    });
  });

  it('handles FETCH_SAFETY_ALERTS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_SUCCESS,
      safetyAlerts: ['alert1', 'alert2'],
    };
    const state = { safetyAlerts: null, fetching: true, error: null };
    expect(reducer(state, responseAction)).toEqual({
      fetchSafetyAlerts: {
        fetching: false,
        safetyAlerts: { records: ['alert1', 'alert2'], XHRStatus: 'ready' },
        error: null,
      },
    });
  });

  it('handles FETCH_SAFETY_ALERTS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_FAILURE,
      safetyAlerts: null,
      error: 'error happened',
    };
    const state = { safetyAlerts: null, fetching: true, error: null };
    expect(reducer(state, failureAction)).toEqual({
      fetchSafetyAlerts: {
        fetching: false,
        safetyAlerts: null,
        error: 'error happened',
      },
    });
  });
});
