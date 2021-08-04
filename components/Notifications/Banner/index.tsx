import React, { useEffect, useRef } from 'react';
import i18n from 'i18next';
import { SvgDisconnect } from '@make.org/ui/Svg/elements';
import {
  clearNotificationBanner,
  dismissNotification,
} from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NOTIF } from '@make.org/types/enums';
import { NotificationMessage } from '../Message';
import {
  NotificationWrapperStyle,
  NotificationContentStyle,
  NotificationCloseButtonStyle,
} from './style';
import { NotificationIcon } from '../Icon';

export const NotificationBanner: React.FC = () => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const { dispatch, state } = useAppContext();
  const { contentId, level, toDismiss, params } = state.notifications.banner;
  const { dismissed } = state.notifications;
  const uniqueIdentifier = JSON.stringify({ contentId, params });
  const isDismissed = dismissed.find(
    notificationId => notificationId === uniqueIdentifier
  );

  const closeNotificationBanner = () => {
    if (toDismiss) {
      dispatch(dismissNotification(uniqueIdentifier));
      return dispatch(clearNotificationBanner());
    }

    return dispatch(clearNotificationBanner());
  };

  useEffect(() => {
    if (notificationRef && notificationRef.current) {
      notificationRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!contentId]);

  if (!contentId || isDismissed) return null;
  const role = level === 'alert' ? 'alert' : 'assertive';

  return (
    <NotificationWrapperStyle ref={notificationRef} role={role} tabIndex={0}>
      <NotificationContentStyle className={level}>
        <NotificationIcon
          level={level || NOTIF.NOTIFICATION_LEVEL_INFORMATION}
        />
        <NotificationMessage
          name={contentId}
          params={params}
          close={closeNotificationBanner}
        />
      </NotificationContentStyle>
      <NotificationCloseButtonStyle
        aria-expanded="false"
        onClick={closeNotificationBanner}
      >
        <SvgDisconnect aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.notifications.icons.close')}
        </ScreenReaderItemStyle>
      </NotificationCloseButtonStyle>
    </NotificationWrapperStyle>
  );
};
