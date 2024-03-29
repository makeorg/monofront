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
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  useEffect(() => {
    if (showExpirationSession) {
      trackDisplaySessionExpired();
    }
  }, [showExpirationSession]);

  const handleClose = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(closeSessionExpirationModal());
    const [baseUrl] = window.location.href.split('#');
    window.location.href = baseUrl;
  };

  return (
    <ReactModal
      isOpen={showExpirationSession}
      overlayClassName={isWidget ? 'modal-overlay widget' : 'modal-overlay'}
      className={isWidget ? 'modal-dialog widget' : 'modal-dialog expiration'}
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
