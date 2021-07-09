import React, { useEffect } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import {
  VoteOnlyMessageStyle,
  VoteOnlyButtonStyle,
} from 'Client/ui/Elements/Notifications/Banner/style';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { clearNotificationBanner } from 'Shared/store/actions/notifications';

type Props = {
  close: () => undefined,
};

export const VoteOnlyMessage = ({ close }: Props) => {
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!question) {
      dispatch(clearNotificationBanner());
    }
  }, [question, dispatch]);

  if (!question) {
    return null;
  }
  return (
    <VoteOnlyMessageStyle>
      {i18n.t('common.notifications.vote_only.message', {
        title: question.question,
      })}
      <VoteOnlyButtonStyle aria-expanded="false" onClick={close}>
        {i18n.t('common.notifications.vote_only.button')}
      </VoteOnlyButtonStyle>
    </VoteOnlyMessageStyle>
  );
};
