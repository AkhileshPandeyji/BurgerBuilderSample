import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/combineReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

// a middleware
const logger = (state) => {
  return (next) => {
    return (action) => {
      console.log('Action: ' + action.type);
      let result = next(action);
      return result;
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
