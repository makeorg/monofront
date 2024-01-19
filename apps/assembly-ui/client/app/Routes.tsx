import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import loadable from '@loadable/component';
import {
  // ROUTE_ASSEMBLY_ROOT,
  // ROUTE_ASSEMBLY_CUSTOMER,
  ROUTE_ASSEMBLY_EVENT,
  ROUTE_ASSEMBLY_NOT_FOUND,
  ROUTE_ASSEMBLY_PRIVACY_POLICY,
  ROUTE_ASSEMBLY_COOKIES,
  ROUTE_ASSEMBLY_LEGAL,
} from '../../utils/routes';

const NotFoundPage = loadable(() => import('../pages/NotFound'));
const EventPage = loadable(() => import('../pages/Event'));
const PrivacyPolicyPage = loadable(() => import('../pages/PrivacyPolicy'));
const CookiesPage = loadable(() => import('../pages/Cookies'));
const LegalPage = loadable(() => import('../pages/Legal'));
// const HomePage = loadable(() => import('../pages/Home'));
// const CustomerPage = loadable(() => import('../pages/Customer'));

export const Routes: FC = () => (
  <Switch>
    <Route exact path={ROUTE_ASSEMBLY_NOT_FOUND} component={NotFoundPage} />
    {/* <Route exact path={ROUTE_ASSEMBLY_ROOT} component={HomePage} />
    <Route exact path={ROUTE_ASSEMBLY_CUSTOMER} component={CustomerPage} /> */}
    <Route
      exact
      path={ROUTE_ASSEMBLY_PRIVACY_POLICY}
      component={PrivacyPolicyPage}
    />
    <Route exact path={ROUTE_ASSEMBLY_LEGAL} component={LegalPage} />
    <Route exact path={ROUTE_ASSEMBLY_COOKIES} component={CookiesPage} />
    <Route exact path={ROUTE_ASSEMBLY_EVENT} component={EventPage} />

    <Redirect path="*" to={ROUTE_ASSEMBLY_NOT_FOUND} />
  </Switch>
);
