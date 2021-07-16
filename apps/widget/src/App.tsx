/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { getQuestionDetails } from '@make.org/store/actions/question/';
import { getAllProposals } from '@make.org/store/actions/proposals';
import { useAppContext } from '@make.org/store';
import { KIND_STANDARD } from '@make.org/utils/constants/sequence';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { getProposals, getQuestion } from './server';

const QUESTION_ID = '66a9230b-08cb-4f37-8ed8-aa95a8eac19a';

const App: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { currentQuestion } = state;

  useEffect(() => {
    const getAllDetails = async () => {
      const question = await getQuestion(QUESTION_ID);
      dispatch(getQuestionDetails(question));

      const proposals = await getProposals(question.questionId);
      dispatch(getAllProposals(proposals));
    };
    getAllDetails();
  }, []);

  if (!currentQuestion) {
    return <div>No question yet</div>;
  }

  return <Sequence sequenceKind={KIND_STANDARD} />;
};

export default App;
