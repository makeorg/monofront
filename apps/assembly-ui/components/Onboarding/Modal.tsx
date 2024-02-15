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

ReactModal.setAppElement('#app');

const DISPLAY_ONBOARDING_PARAM = 'displayonboarding';

export const OnboardingModal: FC = () => {
  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const searchQuery = urlSearchParams.get(DISPLAY_ONBOARDING_PARAM);
  const showOnboarding = searchQuery !== 'false';
  const [isOpen, setIsOpen] = useState<boolean>(showOnboarding);

  useEffect(() => {
    if (isOpen) {
      lockBody();
    }
  }, []);

  const handleClose = () => {
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
        onClick={handleClose}
        type="button"
      >
        <OnboardingCrossStyle />
      </OnboardingCloseStyle>
      <OnboardingContent />
      <OnboardingCloseButtonStyle
        aria-expanded="false"
        onClick={handleClose}
        type="button"
      >
        {i18n.t('modal.discover')}
      </OnboardingCloseButtonStyle>
    </ReactModal>
  );
};
