import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { SvgClose } from '@make.org/ui/Svg/elements';
import {
  clearNotificationTip,
  dismissNotification,
} from '@make.org/store/actions/notifications';
import { NotificationMessage } from '../Message';
import {
  TipWrapperStyle,
  TipCrossStyle,
  TriangleUpStyle,
  TriangleDownStyle,
} from './style';
import { NotificationIcon } from '../Icon';

type Props = {
  /** isFirstSequenceVote for specific design on sequence firstProposal */
  isFirstSequenceVote: boolean,
};

export const Tip: React.FC<Props> = ({ isFirstSequenceVote = false }) => {
  const dispatch = useDispatch();
  const { contentId, level, toDismiss } = useSelector(
    (state: StateRoot) => state.notifications.tip
  );
  const { dismissed } = useSelector((state: StateRoot) => state.notifications);
  const isDismissed = dismissed.f((notificationId) => notificationId === contentId);

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
      {!isFirstSequenceVote && <TriangleUpStyle />}
      <TipWrapperStyle isFirstSequenceVote={isFirstSequenceVote}>
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
