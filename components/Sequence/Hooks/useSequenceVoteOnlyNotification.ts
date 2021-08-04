import { useEffect } from 'react';
import { QuestionType } from '@make.org/types';
import { NOTIF } from '@make.org/types/enums';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';

export const useSequenceVoteOnlyNotification = (
  question: QuestionType
): void => {
  const { dispatch } = useAppContext();
  useEffect(() => {
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
  }, [question, dispatch]);
};
