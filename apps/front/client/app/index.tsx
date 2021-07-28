import React, { useEffect, FC } from 'react';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import {
  AppWrapperStyle,
  AppMainContentStyle,
} from '@make.org/ui/elements/MainElements';
import {
  NAVIGATION_ARIA_CLASS,
  PANEL_ARIA_CLASS,
} from '@make.org/utils/constants/a11y';
import { MAIN_CONTENT } from '@make.org/utils/constants/ids';
import { NotificationBanner } from '@make.org/components/Notifications/Banner';
import { debounce } from '@make.org/utils/helpers/timers';
import { DEBOUNCE_TIMER } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { CookieModal } from './CookieModal';
import { updateDeviceInState } from '../helper/updateDeviceInState';
import { Header } from './Header';
import { Footer } from './Footer';
import { Modal } from './Modal';
import { Routes } from './Routes';
import { SecureExpiration } from './Expiration/Secure';
import { SessionExpiration } from './Expiration/Session';
import { ErrorBoundary, ServiceErrorHandler } from './Error';
import { MainSkipLinks } from './SkipLinks/Main';
import { Panel } from './Panel';
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
                  id={MAIN_CONTENT}
                  data-cy-container="main"
                  className={`${NAVIGATION_ARIA_CLASS} ${PANEL_ARIA_CLASS}`}
                >
                  <NotificationBanner />
                  <Routes />
                </AppMainContentStyle>
                <Modal />
                <Footer /> */
              </AppWrapperStyle>
            </>
            <Panel />
          </ErrorBoundary>
        </ServiceErrorHandler>
      </SessionExpiration>
    </SecureExpiration>
  );
};
