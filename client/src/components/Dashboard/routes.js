import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import FiltersPage from '../FiltersPage';
import FilterPage from '../FilterPage';

export default () => (
  <div style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#000' }}>
    <Switch>
      <Route exact path="/" component={FiltersPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/filters/add" component={FilterPage} />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  </div>
);

