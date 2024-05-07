import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import { useLocation } from 'react-router';
import { OnboardingContent } from './Content';
import {
  OnboardingCloseStyle,
  OnboardingCrossStyle,
  OnboardingCloseButtonStyle,
} from './style';
import { useTracking } from '../Tracking/useTracking';
import { useAssemblyContext } from '../../store/context';

ReactModal.setAppElement('#app');

const DISPLAY_ONBOARDING_PARAM = 'displayonboarding';

export const OnboardingModal: FC = () => {
  const { search } = useLocation();
  const tracker = useTracking();
  const { state } = useAssemblyContext();
  const { event, visitorId } = state;
  const { slug: eventSlug } = event;
  const urlSearchParams = new URLSearchParams(search);
  const showOnboarding =
    urlSearchParams.get(DISPLAY_ONBOARDING_PARAM) !== 'false';
  const [isOpen, setIsOpen] = useState<boolean>(showOnboarding);

  useEffect(() => {
    if (isOpen) {
      lockBody();
    }
  }, []);

  const handleClose = (triggerName: 'close' | 'discover') => () => {
    tracker.track('ACTION-QUIT-ONBOARDING', {
      visitor_id: visitorId,
      modal_action_type: triggerName,
      event_slug: eventSlug,
    });
    unlockBody();
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="modal-overlay"
      className="modal-dialog"
    >
      <OnboardingCloseStyle
        aria-label={i18n.t('modal.closeLabel')}
        aria-expanded="false"
        onClick={handleClose('close')}
        type="button"
      >
        <OnboardingCrossStyle />
      </OnboardingCloseStyle>
      <OnboardingContent />
      <OnboardingCloseButtonStyle
        aria-expanded="false"
        onClick={handleClose('discover')}
        type="button"
      >
        {i18n.t('modal.discover')}
      </OnboardingCloseButtonStyle>
    </ReactModal>
  );
};
