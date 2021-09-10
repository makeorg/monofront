/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { SEQUENCE } from '@make.org/types/enums';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { useAppContext } from '@make.org/store';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { Modal } from '@make.org/components/Modal';
import { Panel } from '@make.org/components/Panel';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
// import { CookieModal } from '@make.org/components/CookieModal';
import { QuestionService } from '@make.org/utils/services/Question';
import { loadQuestion } from '@make.org/store/actions/questions';
import { useLocation } from 'react-router-dom';
import { env } from '@make.org/assets/env';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { setCurrentQuestionSlug } from '@make.org/store/actions/currentQuestion';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { WidgetContainer } from './style';
import { HeaderPanel } from './components/HeaderPanel';
import { Maintenance } from './components/Maintenance';
import { IntroProposal } from './components/IntroProposal';
import { ClosedConsultation } from './components/ClosedConsultation';

const App: FC = () => {
  const { state, dispatch } = useAppContext();
  const { currentQuestion, appConfig, modal } = state;
  const { language, country, source, maintenance, unsecure } = appConfig;
  const { showDataPolicy } = modal;
  const question: QuestionType = selectCurrentQuestion(state);
  const query = new URLSearchParams(useLocation().search);
  const questionSlug = query.get('questionSlug');
  const topProposalIsActive = question.activeFeatureData.topProposal !== null;
  const [topProposal, disableTopProposal] =
    useState<boolean>(topProposalIsActive);

  ApiService.strategy = apiClient;
  trackingParamsService.source = source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.questionId = question.questionId || '';

  const getAllDetails = async () => {
    const response = await QuestionService.getDetail(
      questionSlug || currentQuestion
    );
    if (response) {
      dispatch(loadQuestion(response));
      dispatch(setCurrentQuestionSlug(response.slug));
    }
  };

  useEffect(() => {
    if (env.isDev()) {
      getAllDetails();
    }

    // TO DO
    // add listener to update apiClient params
    trackingParamsService.addListener({
      onTrackingUpdate: params => {
        apiClient.source = params.source || source;
        apiClient.country = params.country || country;
        apiClient.language = params.language || language;
        apiClient.location = params.location || '';
        apiClient.url = params.url || '';
        apiClient.referrer = params.referrer || '';
        apiClient.questionId = params.questionId || question.questionId || '';
      },
    });
  }, []);

  if (maintenance) {
    return <Maintenance />;
  }

  if (!currentQuestion) {
    return (
      <WidgetContainer>
        <Spinner />
      </WidgetContainer>
    );
  }

  if (!isInProgress(question) || unsecure) {
    return <ClosedConsultation />;
  }

  return (
    <WidgetContainer>
      <HeaderPanel />
      {topProposal ? (
        <IntroProposal handleChange={disableTopProposal} />
      ) : (
        <Sequence sequenceKind={SEQUENCE.KIND_STANDARD} />
      )}
      <Panel />
      <Modal />
      {showDataPolicy && <PrivacyPolicyModal />}
    </WidgetContainer>
  );
};

export default App;
