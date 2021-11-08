import { QuestionType } from '@make.org/types';
import { NOTIF } from '@make.org/types/enums';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { useEffect } from 'react';

export const useSequenceVoteOnlyNotification = (
  question: QuestionType
): void => {
  const { dispatch, state } = useAppContext();
  const { contentId, params } = state.notifications.banner;
  const isNotificationDisplayed =
    contentId === NOTIF.VOTE_ONLY_MESSAGE &&
    params.questionId === question.questionId;

  useEffect(() => {
    if (isNotificationDisplayed) {
      return;
    }
    if (question && !question.canPropose) {
      dispatch(
        displayNotificationBanner(
          NOTIF.VOTE_ONLY_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_INFORMATION,
          { questionId: question.questionId },
          true
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
};
