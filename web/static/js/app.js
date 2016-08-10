import 'babel-core/register';
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers/index';
import routes from './routes';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
const store =  applyMiddleware(thunk)(createStore)(rootReducer, window.devToolsExtension ? window.devToolsExtension() : f => f);
const history = syncHistoryWithStore(browserHistory, store)

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('root')
);
