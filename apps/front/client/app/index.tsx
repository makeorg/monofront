import React, { useEffect, FC, useState } from 'react';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import {
  AppWrapperStyle,
  AppMainContentStyle,
} from '@make.org/ui/elements/MainElements';
import { ROUTE_COUNTRY, ROUTE_BASE_CONSULTATION } from '@make.org/utils/routes';
import { NAVIGATION, PANEL, IDS } from '@make.org/types/enums';
import { NotificationBanner } from '@make.org/components/Notifications/Banner';
import { debounce } from '@make.org/utils/helpers/timers';
import { DEBOUNCE_TIMER } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { Route } from 'react-router';
import { Panel } from '@make.org/components/Panel';
import { Modal } from '@make.org/components/Modal';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
import { CookieModal } from '@make.org/components/CookieModal';
import { SecureExpiration } from '@make.org/components/Expiration/Secure';
import { SessionExpirationWithCoockies } from '@make.org/components/Expiration/Session';
import { env } from '@make.org/assets/env';
import { ApiServiceClient } from '@make.org/api/ApiService/ApiService.client';
import { updateDeviceInState } from '../helpers/updateDeviceInState';
import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';
import { ErrorBoundary, ServiceErrorHandler } from './Error';
import { MainSkipLinks } from './SkipLinks/Main';
import { CanonicalUrl } from './CanonicalUrl';
import { Hreflang } from './Hreflang';
import { SortAndFiltersModale } from './Consultation/ExploreFilters/FiltersAndSortModal';

type Props = {
  apiServiceClient?: ApiServiceClient;
};

/**
 * Handles App Business Logic
 */
export const AppContainer: FC<Props> = ({ apiServiceClient }) => {
  const { dispatch, state } = useAppContext();
  const { device, language } = state.appConfig;
  const { showDataPolicy, showSort, showFilters, showCookies } = state.modal;
  const showFiltersOrSortModale = (showSort || showFilters) === true;
  const updateDeviceConfig = debounce(
    () => dispatch(updateDeviceInState(device)),
    DEBOUNCE_TIMER
  );
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // Handle device state after resize
    window.addEventListener('resize', updateDeviceConfig);
    return () => window.removeEventListener('resize', updateDeviceConfig);
  }, [updateDeviceConfig]);

  useEffect(() => {
    setIsClientSide(env.isClientSide());
  }, []);

  useEffect(() => {
    updateDeviceConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const withExpiration = (children: JSX.Element) =>
    apiServiceClient ? (
      <SecureExpiration>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore: 'assets'remove after upgrade to react18 */}
        <SessionExpirationWithCoockies apiServiceClient={apiServiceClient}>
          {children}
        </SessionExpirationWithCoockies>
      </SecureExpiration>
    ) : (
      <SecureExpiration>{children}</SecureExpiration>
    );

  return withExpiration(
    <>
      {showCookies && <CookieModal />}
      {showDataPolicy && <PrivacyPolicyModal />}
      {showFiltersOrSortModale && <SortAndFiltersModale />}
      <ServiceErrorHandler>
        <ErrorBoundary>
          {/** page_wrapper id is used to set page background color in usePageBackgroundColor hook */}
          <div lang={language}>
            <AppWrapperStyle
              id="page_wrapper"
              data-cy-client-loaded={isClientSide}
            >
              <CanonicalUrl />
              <Hreflang />
              <ModernNormalizeStylesheet />
              <FontFacesStylesheet />
              <DefaultStylesheet />
              <UIThemeStylesheet />
              <MainSkipLinks />
              <Route
                path={[`${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}*`, '*']}
              >
                <Header />
              </Route>
              <AppMainContentStyle
                id={IDS.MAIN_CONTENT}
                data-cy-container="main"
                className={`${NAVIGATION.NAVIGATION_ARIA_CLASS} ${PANEL.PANEL_ARIA_CLASS}`}
              >
                <NotificationBanner />
                <Routes />
              </AppMainContentStyle>
              <Modal />
              <Footer />
            </AppWrapperStyle>
            <Panel />
          </div>
        </ErrorBoundary>
      </ServiceErrorHandler>
    </>
  );
};
