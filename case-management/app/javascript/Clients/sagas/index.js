import { all } from 'redux-saga/effects';
import watcherSaga from './sagas';
import fetchRelatedClientsSaga from './fetchRelatedClientsSaga';

function* rootSaga() {
  yield all([watcherSaga(), fetchRelatedClientsSaga()]);
}

export default rootSaga;
