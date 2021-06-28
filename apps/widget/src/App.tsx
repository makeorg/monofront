import React, { useEffect } from 'react';
import './App.css';
import { useAppContext } from './store/context';
import { ACTIONS } from './store/actions';
import { getQuestion } from './server';

const QUESTION_ID = '66a9230b-08cb-4f37-8ed8-aa95a8eac19a';

const App: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const initQuestion = async () => {
    const result = await getQuestion(QUESTION_ID);
    dispatch({
      type: ACTIONS.GET_PROPOSAL,
      data: {
        proposals: result,
        questionId: '66a9230b-08cb-4f37-8ed8-aa95a8eac19a',
      },
    });
  };

  useEffect(() => {
    initQuestion();
  }, [state]);

  return <div>hello world</div>;
};

export default App;
