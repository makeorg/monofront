/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { getProposals, getQuestion } from './server';
import { getAllProposals } from './store/actions/proposals_actions';
import { getQuestionDetails } from './store/actions/question_actions';
import { useAppContext } from './store/context';

const QUESTION_ID = '66a9230b-08cb-4f37-8ed8-aa95a8eac19a';

const App: React.FC = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const getAllDetails = async () => {
      const question = await getQuestion(QUESTION_ID);
      dispatch(getQuestionDetails(question));

      const proposals = await getProposals(question.questionId);
      dispatch(getAllProposals(proposals));
    };
    getAllDetails();
  }, []);

  return <div>hello world</div>;
};

export default App;
