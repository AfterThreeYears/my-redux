import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from './react-redux';

export const Context = React.createContext();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'));
