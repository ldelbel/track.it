import React from 'react';
import ReactDOM from 'react-dom';
import './common/styles/global.scss';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


