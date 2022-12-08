import React from 'react';
import ReactModal from 'react-modal';
import { modalClose } from '@make.org/store/actions/modal';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import { trackClickCloseModal } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { useAppContext } from '@make.org/store';
import { MODAL_TYPES } from '@make.org/types/enums';

ReactModal.setAppElement('#app');

const modalContents = {
  [MODAL_TYPES.MODAL_FORGOT_PASSWORD]: <PasswordForgot />,
  [MODAL_TYPES.MODAL_DEPARTMENT]: null,
};

export const Modal: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const { isOpen, contentType, focusAfterClose } = state.modal;

  const handleCloseWithTracking = () => {
    dispatch(modalClose());
    if (contentType) {
      trackClickCloseModal(contentType);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="modal-overlay"
      className={isWidget ? 'modal-dialog widget' : 'modal-dialog'}
      shouldReturnFocusAfterClose={focusAfterClose}
    >
      <CloseButtonStyle
        aria-label={i18n.t('modal.close') || undefined}
        aria-expanded="false"
        onClick={handleCloseWithTracking}
        type="button"
      >
        <SvgClose aria-hidden focusable="false" />
      </CloseButtonStyle>
      {!!contentType && modalContents[contentType]}
    </ReactModal>
  );
};
