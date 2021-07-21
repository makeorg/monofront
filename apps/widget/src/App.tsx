/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { getAllProposals } from '@make.org/store/actions/proposals';
import { loadQuestion } from '@make.org/store/actions/questions';
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { setCurrentQuestionSlug } from '@make.org/store/actions/currentQuestion';
import { useAppContext } from '@make.org/store';
import { KIND_STANDARD } from '@make.org/utils/constants/sequence';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { getProposals, getQuestion } from './server';

const QUESTION_ID = '66a9230b-08cb-4f37-8ed8-aa95a8eac19a';

const App: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { currentQuestion, questions, appConfig } = state;
  const { language, country, source } = appConfig;

  ApiService.strategy = apiClient;
  trackingParamsService.source = source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.questionId = QUESTION_ID;

  const getAllDetails = async () => {
    const response = await getQuestion(QUESTION_ID);
    dispatch(loadQuestion(response));
    const proposals = await getProposals(response.questionId);
    dispatch(getAllProposals(proposals));
  };

  useEffect(() => {
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
        apiClient.questionId = params.questionId || QUESTION_ID;
      },
    });

    // // Set tracking params

    getAllDetails();
  }, []);

  useEffect(() => {
    if (questions) {
      dispatch(setCurrentQuestionSlug(Object.keys(questions)[0]));
    }
  }, [questions]);

  if (!currentQuestion) {
    return <div>No question yet</div>;
  }

  return <Sequence sequenceKind={KIND_STANDARD} />;
};

export default App;
