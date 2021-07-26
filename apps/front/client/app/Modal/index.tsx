import React from 'react';
import ReactModal from 'react-modal';
import { modalClose } from '@make.org/store/actions/modal';
import {
  MODAL_LOGIN,
  MODAL_REGISTER,
  MODAL_FORGOT_PASSWORD,
  MODAL_PROPOSAL_SUCCESS,
  MODAL_COUNTRIES,
} from '@make.org/utils/constants/modal';
import { Login } from '@make.org/components/Auth/Login';
import { Register } from '@make.org/components/Auth/Register';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import { trackClickCloseModal } from '@make.org/utils/services/Tracking';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import i18n from 'i18next';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { useAppContext } from '@make.org/store';
import { SwitchCountry } from '../SwitchCountry';

ReactModal.setAppElement('#app');

const modalContents = {
  [MODAL_LOGIN]: <Login />,
  [MODAL_REGISTER]: <Register />,
  [MODAL_FORGOT_PASSWORD]: <PasswordForgot />,
  [MODAL_PROPOSAL_SUCCESS]: <ProposalSuccess />,
  [MODAL_COUNTRIES]: <SwitchCountry />,
};

export const Modal: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { isOpen, contentType, focusAfterClose } = state.modal;

  const handleCloseWithTracking = () => {
    dispatch(modalClose());
    trackClickCloseModal(contentType);
  };

  if (isOpen) {
    return (
      <ReactModal
        isOpen={isOpen}
        overlayClassName="modal-overlay"
        className="modal-dialog"
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
        {modalContents[contentType]}
      </ReactModal>
    );
  }

  return null;
};
