import React, { FC } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { MaintenancePage } from './Pages/Maintenance';
import { RootPage } from './Pages/Root';

export const Routes: FC = () => (
  <Switch>
    <Route path="/maintenance" component={MaintenancePage} />
    <Route exact path="/" component={RootPage} />
    <Redirect path="*" to="/maintenance" />
  </Switch>
);
