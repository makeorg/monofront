import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';

ReactModal.setAppElement('#app');

export const FilterAndSortModal: React.FC = () => {
  const [showFilterAndSortModal, setShowFilterAndSortModal] = useState(false);

  const handleClick = () => {
    setShowFilterAndSortModal(!showFilterAndSortModal);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      height: '100%',
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
      isOpen={showFilterAndSortModal}
      style={customStyles}
      overlayClassName="modal-overlay"
      data-cy-container="filterAndSort-modal"
    >
      <CloseButtonStyle
        aria-label={i18n.t('modal.close')}
        aria-expanded="false"
        onClick={handleClick}
        type="button"
      >
        <SvgClose aria-hidden focusable="false" />
      </CloseButtonStyle>
    </ReactModal>
  );
};
