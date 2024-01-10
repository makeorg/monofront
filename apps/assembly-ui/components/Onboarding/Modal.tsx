import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import { OnboardingContent } from './Content';
import {
  OnboardingCloseStyle,
  OnboardingCrossStyle,
  OnboardingCloseButtonStyle,
} from './style';

ReactModal.setAppElement('#app');

export const OnboardingModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    lockBody();
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
