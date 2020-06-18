import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

function fetchSafetyAlerts(
  state = { safetyAlerts: null, fetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_SAFETY_ALERTS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_SAFETY_ALERTS_API_CALL_SUCCESS:
      const alerts = {
        XHRStatus: 'ready',
        records: [...action.safetyAlerts],
      };
      return { ...state, fetching: false, safetyAlerts: alerts, error: null };
    case actionTypes.FETCH_SAFETY_ALERTS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        safetyAlerts: null,
        error: action.error,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  fetchSafetyAlerts,
});

export default reducer;
