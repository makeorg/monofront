import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import i18n from 'i18next';
import { closeSessionExpirationModal } from '@make.org/store/actions/modal';
import { CloseButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { ThirdLevelTitleCircularStyle } from '@make.org/ui/elements/TitleElements';
import { trackDisplaySessionExpired } from '@make.org/utils/services/Tracking';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';
import SessionExpiredPicture from '@make.org/assets/images/session-expired.png';
import {
  ExpirationSessionModalContentStyle,
  ReloadButtonStyle,
  SessionExpiredPictureStyle,
  SessionExpiredParagraphStyle,
} from './style';

ReactModal.setAppElement('#app');

export const ExpirationSessionModal: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { showExpirationSession } = state.modal;

  useEffect(() => {
    if (showExpirationSession) {
      trackDisplaySessionExpired();
    }
  }, [showExpirationSession]);

  const handleClose = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(closeSessionExpirationModal());
    window.location.reload();
  };

  return (
    <ReactModal
      isOpen={showExpirationSession}
      overlayClassName="modal-overlay"
      className="modal-dialog"
      style={{ maxWidth: '350px' }}
      shouldCloseOnOverlayClick
    >
      <CloseButtonStyle aria-expanded="false" onClick={handleClose}>
        <SvgClose aria-hidden focusable="false" />
        <ScreenReaderItemStyle>{i18n.t('modal.close')}</ScreenReaderItemStyle>
      </CloseButtonStyle>
      <ExpirationSessionModalContentStyle>
        <SessionExpiredPictureStyle src={SessionExpiredPicture} alt="" />
        <ThirdLevelTitleCircularStyle>
          {i18n.t('common.notifications.session_expired.title')}
        </ThirdLevelTitleCircularStyle>
        <SessionExpiredParagraphStyle>
          {i18n.t('common.notifications.session_expired.description')}
        </SessionExpiredParagraphStyle>
        <ReloadButtonStyle onClick={handleClose}>
          {i18n.t('common.notifications.session_expired.button_text')}
        </ReloadButtonStyle>
      </ExpirationSessionModalContentStyle>
    </ReactModal>
  );
};
