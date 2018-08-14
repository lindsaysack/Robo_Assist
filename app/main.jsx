'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import Root from './components/Root';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('main')
);

//use for reference: https://github.com/FullstackAcademy/stackchat/blob/day2-solution/client/index.js
