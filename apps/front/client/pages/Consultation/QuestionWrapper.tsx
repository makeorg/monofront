import React, { useState, useEffect, FC } from 'react';
import loadable from '@loadable/component';
import { useParams, useLocation } from 'react-router';
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

import { parse } from 'query-string';
import {
  setPanelContent,
  closePanel,
  removePanelContent,
} from '@make.org/store/actions/panel';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';

import {
  removeCurrentQuestionSlug,
  setCurrentQuestionSlug,
} from '@make.org/store/actions/currentQuestion';
import { loadQuestion } from '@make.org/store/actions/questions';
import { useAppContext } from '@make.org/store';

const NotFoundPage = loadable(() => import('../NotFound'));

type Props = {
  children: JSX.Element;
  withRedirect?: boolean;
};

export const QuestionWrapper: FC<Props> = ({ children, withRedirect }) => {
  const { dispatch, state } = useAppContext();
  const params: {
    questionSlug: string;
  } = useParams();
  const { questionSlug } = params;
  const { country, language } = state.appConfig;
  const questionsInState = state.questions;
  const currentQuestion: QuestionType = selectCurrentQuestion(state);
  const currentQuestionSlug = state.currentQuestion;
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const { displayPanel } = urlQueryParams;

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
      language,
      () => setAlternativeContent(<NotFoundPage />),
      country
    );

    if (questionDetails) {
      updateTrackingQuestionParam(questionDetails);
      dispatch(loadQuestion(questionDetails));
      dispatch(setCurrentQuestionSlug(questionSlug));
    }
  };

  useEffect(() => {
    updateQuestion();

    if (currentQuestionSlug !== questionSlug && questionIsInState) {
      dispatch(setCurrentQuestionSlug(questionSlug));
    }

    return () => dispatch(removeCurrentQuestionSlug());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionSlug, language]);

  useEffect(() => {
    if (
      displayPanel === 'propose' &&
      currentQuestion &&
      currentQuestion.canPropose
    ) {
      dispatch(clearProposalPending());
      dispatch(setPanelContent(<ProposalJourney />));
    }

    return () => {
      dispatch(closePanel());
      dispatch(removePanelContent());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPanel, currentQuestion]);

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
