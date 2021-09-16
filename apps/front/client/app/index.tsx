import React, { useEffect, FC } from 'react';
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
import { Panel } from '@make.org/components/Panel';
import { Modal } from '@make.org/components/Modal';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
import { CookieModal } from '@make.org/components/CookieModal';
import { SecureExpiration } from '@make.org/components/Expiration/Secure';
import { SessionExpiration } from '@make.org/components/Expiration/Session';
import { updateDeviceInState } from '../helper/updateDeviceInState';
import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';
import { ErrorBoundary, ServiceErrorHandler } from './Error';
import { MainSkipLinks } from './SkipLinks/Main';
import { CanonicalUrl } from './CanonicalUrl';
import { Hreflang } from './Hreflang';

/**
 * Handles App Business Logic
 */
export const AppContainer: FC = () => {
  const { dispatch, state } = useAppContext();

  const { device, country } = state.appConfig;
  const { showDataPolicy } = state.modal;

  const updateDeviceConfig = debounce(
    () => dispatch(updateDeviceInState(device)),
    DEBOUNCE_TIMER
  );

  const hasCountry = country && country !== null;

  useEffect(() => {
    // Handle device state after resize
    window.addEventListener('resize', updateDeviceConfig);
    return () => window.removeEventListener('resize', updateDeviceConfig);
  }, [updateDeviceConfig]);

  useEffect(() => {
    updateDeviceConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SecureExpiration>
      <SessionExpiration>
        {hasCountry && <CookieModal />}
        {showDataPolicy && <PrivacyPolicyModal />}
        <ServiceErrorHandler>
          <ErrorBoundary>
            {/** page_wrapper id is used to set page background color in usePageBackgroundColor hook */}
            <>
              <AppWrapperStyle id="page_wrapper">
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
      </SessionExpiration>
    </SecureExpiration>
  );
};
