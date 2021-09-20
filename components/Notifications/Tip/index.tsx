import React from 'react';
import i18n from 'i18next';
import { SvgClose } from '@make.org/ui/Svg/elements';
import {
  clearNotificationTip,
  dismissNotification,
} from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { NotificationMessage } from '../Message';
import { TipWrapperStyle, TipCrossStyle, TriangleDownStyle } from './style';
import { NotificationIcon } from '../Icon';

type Props = {
  /** isFirstSequenceVote for specific design on sequence firstProposal */
  isFirstSequenceVote: boolean;
};

export const Tip: React.FC<Props> = ({ isFirstSequenceVote = false }) => {
  const { dispatch, state } = useAppContext();
  const { tip, dismissed } = state.notifications;
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const { contentId = '', level = '', toDismiss } = tip;
  const isDismissed = dismissed.find(
    (notificationId: string) => notificationId === contentId
  );

  const closeNotificationTip = () => {
    if (toDismiss) {
      dispatch(dismissNotification(contentId));
      return dispatch(clearNotificationTip());
    }

    return dispatch(clearNotificationTip());
  };

  if (!contentId || isDismissed) return null;

  return (
    <>
      <TipWrapperStyle
        isWidget={isWidget}
        className={isFirstSequenceVote ? 'first-vote' : ''}
      >
        <TipCrossStyle
          aria-label={i18n.t('common.notifications.icons.close')}
          onClick={closeNotificationTip}
        >
          <SvgClose aria-hidden focusable="false" />
        </TipCrossStyle>
        <NotificationIcon level={level} context="tip" />
        <NotificationMessage name={contentId} />
      </TipWrapperStyle>
      {isFirstSequenceVote && <TriangleDownStyle />}
    </>
  );
};
