import React from 'react';
import ReactModal from 'react-modal';
import { modalClose } from '@make.org/store/actions/modal';
import { Login } from '@make.org/components/Auth/Login';
import { Register } from '@make.org/components/Auth/Register';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import { trackClickCloseModal } from '@make.org/utils/services/Tracking';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import i18n from 'i18next';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { useAppContext } from '@make.org/store';
import { MODAL_TYPES } from '@make.org/types/enums';
import { SwitchCountry } from '../SwitchCountry';

ReactModal.setAppElement('#app');

const modalContents = {
  [MODAL_TYPES.MODAL_LOGIN]: <Login />,
  [MODAL_TYPES.MODAL_REGISTER]: <Register />,
  [MODAL_TYPES.MODAL_FORGOT_PASSWORD]: <PasswordForgot />,
  [MODAL_TYPES.MODAL_PROPOSAL_SUCCESS]: <ProposalSuccess />,
  [MODAL_TYPES.MODAL_COUNTRIES]: <SwitchCountry />,
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

  if (isOpen) {
    return (
      <ReactModal
        isOpen={isOpen}
        overlayClassName="modal-overlay"
        className={isWidget ? 'modal-dialog' : 'modal-dialog widget'}
        shouldReturnFocusAfterClose={focusAfterClose}
      >
        <CloseButtonStyle
          aria-label={i18n.t('modal.close')}
          aria-expanded="false"
          onClick={handleCloseWithTracking}
          type="button"
        >
          <SvgClose aria-hidden focusable="false" />
        </CloseButtonStyle>
        {!!contentType && modalContents[contentType]}
      </ReactModal>
    );
  }

  return null;
};
