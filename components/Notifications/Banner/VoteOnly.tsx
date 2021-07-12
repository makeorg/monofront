import React, { useEffect } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { clearNotificationBanner } from '@make.org/store/actions/notifications';
import { VoteOnlyMessageStyle, VoteOnlyButtonStyle } from './style';

type Props = {
  close: () => undefined;
};

export const VoteOnlyMessage: React.FC<Props> = ({ close }) => {
  const { dispatch, state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

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
