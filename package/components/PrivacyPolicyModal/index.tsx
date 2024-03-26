import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { ILogger } from '@make.org/types';
import { DataPolicy } from './DataPolicy';
import { RefusalConfirmation } from './RefusalConfirmation';

ReactModal.setAppElement('#app');

type Props = {
  logger: ILogger;
};

export const PrivacyPolicyModal: React.FC<Props> = ({ logger }) => {
  const [confirmation, setConfirmation] = useState(false);
  const toggleConfirmation = () => {
    setConfirmation(!confirmation);
  };

  const handleClick = () => {
    toggleConfirmation();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      padding: null,
      border: null,
      zIndex: 10,
      overflow: 'hidden',
    },
  };

  return (
    <ReactModal
      isOpen
      style={customStyles}
      overlayClassName="modal-overlay"
      data-cy-container="cookie-modal"
    >
      <CloseButtonStyle
        aria-label={i18n.t('modal.close') || undefined}
        aria-expanded="false"
        onClick={handleClick}
        type="button"
      >
        <SvgClose aria-hidden focusable="false" />
      </CloseButtonStyle>
      {confirmation ? (
        <RefusalConfirmation toggleConfirmation={toggleConfirmation} />
      ) : (
        <DataPolicy logger={logger} />
      )}
    </ReactModal>
  );
};
