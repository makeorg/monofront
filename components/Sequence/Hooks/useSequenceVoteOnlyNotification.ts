import { useEffect } from 'react';
import { QuestionType } from '@make.org/types';
import {
  NOTIFICATION_LEVEL_INFORMATION,
  VOTE_ONLY_MESSAGE,
} from '@make.org/utils/constants/notifications';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';

export const useSequenceVoteOnlyNotification = (question: QuestionType): void => {
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (question && !question.canPropose) {
      dispatch(
        displayNotificationBanner(
          VOTE_ONLY_MESSAGE,
          NOTIFICATION_LEVEL_INFORMATION,
          { questionId: question.questionId },
          true
        )
      );
    }
  }, [question, dispatch]);
};
