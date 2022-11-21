import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import i18n from 'i18next';
import {
  modalCloseCookies,
  modalShowCookies,
} from '@make.org/store/actions/modal';
import {
  trackClickModalCookieSave,
  trackClickModalCookiePersonalize,
  trackClickModalCookieRefuse,
} from '@make.org/utils/services/Tracking';
import {
  initTrackersFromPreferences,
  removeTrackersFromPreferences,
  setTrackingConsentFromPreferencesCookie,
  getTrackingConsentFromPreferencesCookie,
} from '@make.org/utils/helpers/clientCookies';
import {
  acceptAllCookiesPreferences,
  rejectAllCookiesPreferences,
  setCookiesPreferencesInApp,
} from '@make.org/store/actions/user/cookiesPreferences';
import {
  ACCEPT_ALL_PREFERENCES,
  ENABLE_MIXPANEL,
  REJECT_ALL_PREFRENCES,
} from '@make.org/utils/constants/cookies';
import { useAppContext } from '@make.org/store';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import {
  CookieModalButtonWithLinkStyle,
  CookieModalBannerWrapperStyle,
  CookieModalRedButtonStyle,
  SvgCookieStyle,
} from './style';
import { FirstStepCookie } from './FirstStep';
import { SecondStepCookie } from './SecondStep';

// set modal and styles
ReactModal.setAppElement('#app');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    border: null,
    padding: null,
    zIndex: 10,
    overflow: 'hidden',
  },
};

export const CookieModal: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { showCookies } = state.modal;
  const { cookiesPreferences } = state.user;
  const [customization, enableCustomization] = useState(false);
  const preferencesCookie = getTrackingConsentFromPreferencesCookie();

  const handleAcceptAll = async () => {
    dispatch(acceptAllCookiesPreferences());
    trackClickModalCookieSave('cookies-accept-all');
    dispatch(modalCloseCookies());
    setTrackingConsentFromPreferencesCookie(ACCEPT_ALL_PREFERENCES);
    initTrackersFromPreferences(
      ACCEPT_ALL_PREFERENCES,
      trackingParamsService.visitorId,
      ENABLE_MIXPANEL
    );
  };

  const handleRejectAll = () => {
    dispatch(rejectAllCookiesPreferences());
    trackClickModalCookieRefuse();
    dispatch(modalCloseCookies());
    setTrackingConsentFromPreferencesCookie(REJECT_ALL_PREFRENCES);
    removeTrackersFromPreferences(REJECT_ALL_PREFRENCES);
  };

  const toggleCustomization = () => {
    enableCustomization(!customization);
  };

  const handlePersonalize = () => {
    toggleCustomization();
    trackClickModalCookiePersonalize();
  };

  const handlePreferences = () => {
    trackClickModalCookieSave('cookies-accept-preferences');
    dispatch(modalCloseCookies());
    setTrackingConsentFromPreferencesCookie(cookiesPreferences);
    removeTrackersFromPreferences(cookiesPreferences);
    initTrackersFromPreferences(
      cookiesPreferences,
      trackingParamsService.visitorId,
      ENABLE_MIXPANEL
    );
  };

  useEffect(() => {
    dispatch(
      setCookiesPreferencesInApp({
        ...cookiesPreferences,
        ...preferencesCookie,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!preferencesCookie) {
      dispatch(modalShowCookies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferencesCookie]);

  if (!showCookies) {
    return null;
  }

  return (
    <ReactModal
      isOpen={showCookies}
      style={customStyles}
      overlayClassName="modal-overlay"
      data-cy-container="cookie-modal"
    >
      {customization ? (
        <SecondStepCookie
          toggleCustomization={toggleCustomization}
          handleRejectAll={handleRejectAll}
        />
      ) : (
        <FirstStepCookie handleRejectAll={handleRejectAll} />
      )}
      <CookieModalBannerWrapperStyle>
        <SvgCookieStyle aria-hidden focusable="false" />
        {customization ? (
          <CookieModalRedButtonStyle type="button" onClick={handlePreferences}>
            {i18n.t('cookie_modal.save')}
          </CookieModalRedButtonStyle>
        ) : (
          <>
            <CookieModalRedButtonStyle
              type="button"
              onClick={handleAcceptAll}
              data-cy-button="accept-cookies"
            >
              {i18n.t('cookie_modal.accept')}
            </CookieModalRedButtonStyle>
            <CookieModalButtonWithLinkStyle
              type="button"
              onClick={handlePersonalize}
              data-cy-button="personalize-cookies"
            >
              {i18n.t('cookie_modal.personalize')}
            </CookieModalButtonWithLinkStyle>
          </>
        )}
      </CookieModalBannerWrapperStyle>
    </ReactModal>
  );
};
