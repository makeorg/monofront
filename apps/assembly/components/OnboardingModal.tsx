import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import {
  OnboardingClose,
  OnboardingCross,
  OnboardingCloseButton,
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
      <OnboardingClose
        aria-label={i18n.t('modal.closeLabel')}
        aria-expanded="false"
        onClick={handleClose}
        type="button"
      >
        <OnboardingCross />
      </OnboardingClose>
      <OnboardingCloseButton
        aria-label={i18n.t('modal.closeLabel')}
        aria-expanded="false"
        onClick={handleClose}
        type="button"
      >
        {i18n.t('modal.discover')}
      </OnboardingCloseButton>
    </ReactModal>
  );
};
