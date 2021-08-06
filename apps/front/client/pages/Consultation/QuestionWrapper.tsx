import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router';
import { QuestionService } from '@make.org/utils/services/Question';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionType } from '@make.org/types/Question';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  updateTrackingQuestionParam,
  getQuestionFromState,
} from '@make.org/utils/helpers/question';

import {
  removeCurrentQuestionSlug,
  setCurrentQuestionSlug,
} from '@make.org/store/actions/currentQuestion';
import { loadQuestion } from '@make.org/store/actions/questions';
import { useAppContext } from '@make.org/store';
import { NotFoundPage } from '../NotFound';

type Props = {
  children: JSX.Element;
  withRedirect?: boolean;
};

export const QuestionWrapper: FC<Props> = ({ children, withRedirect }) => {
  const { dispatch, state } = useAppContext();
  const params: { country: string; questionSlug: string } = useParams();
  const { country, questionSlug } = params;
  const questionsInState = state.questions;
  const currentQuestion: QuestionType = selectCurrentQuestion(state);
  const currentQuestionSlug = state.currentQuestion;

  const [alternativeContent, setAlternativeContent] = useState(
    <MiddlePageWrapperStyle>
      <Spinner />
    </MiddlePageWrapperStyle>
  );

  const questionIsInState = getQuestionFromState(
    questionsInState,
    questionSlug
  );

  const updateQuestion = async () => {
    const questionDetails = await QuestionService.getDetail(
      questionSlug,
      () => setAlternativeContent(<NotFoundPage />),
      country
    );

    if (questionDetails) {
      dispatch(loadQuestion(questionDetails));
      dispatch(setCurrentQuestionSlug(questionSlug));
    }
  };

  useEffect(() => {
    if (!questionIsInState) {
      updateQuestion();
    }

    if (currentQuestionSlug !== questionSlug && questionIsInState) {
      dispatch(setCurrentQuestionSlug(questionSlug));
    }

    return () => dispatch(removeCurrentQuestionSlug());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionSlug]);

  useEffect(() => {
    if (currentQuestion) {
      updateTrackingQuestionParam(currentQuestion);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  if (!currentQuestion) {
    return alternativeContent;
  }

  if (withRedirect && !isInProgress(currentQuestion)) {
    if (typeof window === 'object') {
      window.location.href = currentQuestion.aboutUrl;
    }
    return alternativeContent;
  }

  return children;
};
