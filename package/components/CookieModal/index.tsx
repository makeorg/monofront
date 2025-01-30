// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import i18n from 'i18next';
import { modalCloseCookies } from '@make.org/store/actions/modal';
import {
  trackClickModalCookieSave,
  trackClickModalCookiePersonalize,
  trackClickModalCookieRefuse,
} from '@make.org/utils/services/Tracking';
import {
  initTrackersFromPreferences,
  removeTrackersFromPreferences,
  setCookieWithTrackingConsent,
} from '@make.org/utils/helpers/clientCookies';
import {
  acceptAllTrackingConsent,
  rejectAllTrackingConsent,
} from '@make.org/store/actions/user/trackingConsent';
import {
  ACCEPT_ALL_PREFERENCES,
  ENABLE_MIXPANEL,
  REJECT_ALL_PREFRENCES,
} from '@make.org/utils/constants/cookies';
import { useAppContext } from '@make.org/store';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { ILogger } from '@make.org/types';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import {
  CookieModalButtonWithLinkStyle,
  CookieModalBannerWrapperStyle,
  SvgCookieStyle,
} from './style';
import { FirstStepCookie } from './FirstStep';
import { SecondStepCookie } from './SecondStep';
import { PrimaryButton, PRIMARYTYPE } from '../Buttons';

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

type Props = {
  logger: ILogger;
};

export const CookieModal: React.FC<Props> = ({ logger }) => {
  const { dispatch, state } = useAppContext();
  const { showCookies } = state.modal;
  const { trackingConsent } = state.user;
  const [customization, enableCustomization] = useState(false);

  const handleAcceptAll = async () => {
    dispatch(acceptAllTrackingConsent());
    trackClickModalCookieSave('cookies-accept-all');
    dispatch(modalCloseCookies());
    setCookieWithTrackingConsent(ACCEPT_ALL_PREFERENCES);
    initTrackersFromPreferences(
      ACCEPT_ALL_PREFERENCES,
      logger,
      trackingParamsService.visitorId,
      ENABLE_MIXPANEL
    );
  };

  const handleRejectAll = () => {
    dispatch(rejectAllTrackingConsent());
    trackClickModalCookieRefuse();
    dispatch(modalCloseCookies());
    setCookieWithTrackingConsent(REJECT_ALL_PREFRENCES);
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
    setCookieWithTrackingConsent(trackingConsent);
    removeTrackersFromPreferences(trackingConsent);
    initTrackersFromPreferences(
      trackingConsent,
      logger,
      trackingParamsService.visitorId,
      ENABLE_MIXPANEL
    );
  };

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
          <PrimaryButton
            type={PRIMARYTYPE.BUTTON}
            onClick={handlePreferences}
            style={{ marginLeft: spacings.sm }}
          >
            {i18n.t('cookie_modal.save')}
          </PrimaryButton>
        ) : (
          <>
            <PrimaryButton
              type={PRIMARYTYPE.BUTTON}
              onClick={handleAcceptAll}
              style={{ marginLeft: spacings.sm }}
              data-cy-button="accept-cookies"
            >
              {i18n.t('cookie_modal.accept')}
            </PrimaryButton>
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
