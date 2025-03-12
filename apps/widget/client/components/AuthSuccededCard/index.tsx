import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppContext } from '@make.org/store';
import { QuestionService } from '@make.org/utils/services/Question';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { loadQuestion } from '@make.org/store/actions/questions';
import { setCurrentQuestionSlug } from '@make.org/store/actions/currentQuestion';
import { resetAuthRedirectInfo } from '@make.org/store/actions/authRedirectInfo';

export const AuthSuccededCard: FC = () => {
  const [isParticipateEnable, setIsParticipateEnable] =
    useState<boolean>(false);
  const history = useHistory();

  const { dispatch } = useAppContext();

  useEffect(() => {
    const updateQuestion = async () => {
      const questionDetails = await QuestionService.getDetail(
        'maif-pauline',
        DEFAULT_LANGUAGE,
        () => {
          history.push('/');
        },
        undefined
      );

      if (questionDetails) {
        dispatch(loadQuestion(questionDetails));
        dispatch(setCurrentQuestionSlug('maif-pauline'));
        dispatch(resetAuthRedirectInfo());
        setIsParticipateEnable(true);
      }
    };

    updateQuestion();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Identification réussie
        </h2>
        <p className="mt-3 text-gray-700 text-sm">
          En vous identifiant, vous acceptez nos
          <a href="/" className="text-gray-900 underline font-medium">
            conditions générales d’utilisation
          </a>
          .
        </p>
        <div className="mt-6 flex items-start space-x-3 text-left">
          <input
            type="checkbox"
            id="accept"
            className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label
            htmlFor="accept"
            className="text-sm text-gray-700 leading-tight"
          >
            J&aposaccepte que Make.org traite ces données pour que je puisse
            participer selon{' '}
            <a href="/" className="text-red-600 underline font-medium">
              la charte
            </a>
            .
          </label>
        </div>

        <button
          type="button"
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition"
          disabled={!isParticipateEnable}
          onClick={() => {
            history.push('/');
          }}
        >
          PARTICIPER
        </button>
      </div>
    </div>
  );
};
