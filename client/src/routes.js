import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

export default () => (
  <Provider store={store}>
    <Router>
      <Route component={Dashboard}></Route>
    </Router>
  </Provider>
);
