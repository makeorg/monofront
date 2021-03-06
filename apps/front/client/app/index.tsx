import React, { useEffect, FC, useState } from 'react';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import {
  AppWrapperStyle,
  AppMainContentStyle,
} from '@make.org/ui/elements/MainElements';
import { NAVIGATION, PANEL, IDS } from '@make.org/types/enums';
import { NotificationBanner } from '@make.org/components/Notifications/Banner';
import { debounce } from '@make.org/utils/helpers/timers';
import { DEBOUNCE_TIMER } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import {
  setPanelContent,
  closePanel,
  removePanelContent,
} from '@make.org/store/actions/panel';
import { Login } from '@make.org/components/Auth/Login';
import { Register } from '@make.org/components/Auth/Register';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { useLocation } from 'react-router';
import { Panel } from '@make.org/components/Panel';
import { Modal } from '@make.org/components/Modal';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
import { CookieModal } from '@make.org/components/CookieModal';
import { SecureExpiration } from '@make.org/components/Expiration/Secure';
import { SessionExpirationWithCoockies } from '@make.org/components/Expiration/Session';
import { env } from '@make.org/assets/env';
import { parse } from 'query-string';
import { updateDeviceInState } from '../helpers/updateDeviceInState';
import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';
import { ErrorBoundary, ServiceErrorHandler } from './Error';
import { MainSkipLinks } from './SkipLinks/Main';
import { CanonicalUrl } from './CanonicalUrl';
import { Hreflang } from './Hreflang';
import { SortAndFiltersModale } from './Consultation/ExploreFilters/FiltersAndSortModal';

/**
 * Handles App Business Logic
 */
export const AppContainer: FC = () => {
  const { dispatch, state } = useAppContext();
  const { device, country } = state.appConfig;
  const { showDataPolicy, showSort, showFilters } = state.modal;
  const showFiltersOrSortModale = (showSort || showFilters) === true;
  const updateDeviceConfig = debounce(
    () => dispatch(updateDeviceInState(device)),
    DEBOUNCE_TIMER
  );
  const [isClientSide, setIsClientSide] = useState(false);
  const hasCountry = country && country !== null;
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const { displayPanel } = urlQueryParams;
  const { isLoggedIn } = selectAuthentication(state);

  useEffect(() => {
    if (displayPanel === 'signin' && !isLoggedIn) {
      dispatch(setPanelContent(<Login />));
    }

    if (displayPanel === 'signup' && !isLoggedIn) {
      dispatch(setPanelContent(<Register />));
    }

    return () => {
      dispatch(closePanel());
      dispatch(removePanelContent());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPanel]);

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

  return (
    <SecureExpiration>
      <SessionExpirationWithCoockies>
        {hasCountry && <CookieModal />}
        {showDataPolicy && <PrivacyPolicyModal />}
        {showFiltersOrSortModale && <SortAndFiltersModale />}
        <ServiceErrorHandler>
          <ErrorBoundary>
            {/** page_wrapper id is used to set page background color in usePageBackgroundColor hook */}
            <>
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
                <Header />
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
            </>
            <Panel />
          </ErrorBoundary>
        </ServiceErrorHandler>
      </SessionExpirationWithCoockies>
    </SecureExpiration>
  );
};
