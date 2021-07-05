import { useEffect } from 'react';
import { QuestionType } from '@make.org/types';
import {
  NOTIFICATION_LEVEL_INFORMATION,
  VOTE_ONLY_MESSAGE,
} from '@make.org/utils/constants/notifications';

// REDUX REST TO DO
import { useDispatch } from 'react-redux';
import { displayNotificationBanner } from 'Shared/store/actions/notifications';

export const useSequenceVoteOnlyNotification = (question: QuestionType) => {
  const dispatch = useDispatch;
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
