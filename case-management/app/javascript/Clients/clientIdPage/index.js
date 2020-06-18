import React from 'react';
import ReactDOM from 'react-dom';
import ClientIdPage from './ClientIdPage';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers/reducers';
import saga from '../sagas/index';

const clientId = document.getElementById('root');

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <ClientIdPage />
  </Provider>,
  clientId
);
