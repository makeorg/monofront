import React, { FC } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { MaintenancePage } from './Pages/Maintenance';
import { RootPage } from './Pages/Root';
import { OidcPage } from './Pages/Oidc';
import { AuthSuccededCard } from './components/AuthSuccededCard';

export const Routes: FC = () => (
  <Switch>
    <Route path="/maintenance" component={MaintenancePage} />
    <Route exact path="/" component={RootPage} />
    <Route exact path="/oidc" component={OidcPage} />
    <Route exact path="/auth-succeded" component={AuthSuccededCard} />
    <Redirect path="*" to="/maintenance" />
  </Switch>
);
