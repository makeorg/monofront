import React from 'react';
import { NOTIF } from '@make.org/types/enums';
import i18n from 'i18next';
import {
  NotificationAlertStyle,
  NotificationSuccessStyle,
  NotificationInfosStyle,
} from './style';

type Props = {
  level: string;
  context?: string;
};

export const NotificationIcon: React.FC<Props> = ({
  level,
  context = 'banner',
}) => {
  switch (level) {
    case NOTIF.NOTIFICATION_LEVEL_INFORMATION:
      return (
        <NotificationInfosStyle
          aria-label={
            i18n.t('common.notifications.icons.information') || undefined
          }
          className={context}
          focusable="false"
        />
      );
    case NOTIF.NOTIFICATION_LEVEL_SUCCESS:
      return (
        <NotificationSuccessStyle
          aria-label={i18n.t('common.notifications.icons.success') || undefined}
          className={context}
          focusable="false"
        />
      );
    case NOTIF.NOTIFICATION_LEVEL_ERROR:
      return (
        <NotificationAlertStyle
          aria-label={i18n.t('common.notifications.icons.error') || undefined}
          className={context}
          focusable="false"
        />
      );
    case NOTIF.NOTIFICATION_LEVEL_ALERT:
      return (
        <NotificationAlertStyle
          aria-label={i18n.t('common.notifications.icons.alert') || undefined}
          className={context}
          focusable="false"
        />
      );

    default:
      return null;
  }
};
