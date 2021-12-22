import { FirstProposalSequenceType } from '@make.org/types';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { apiServer } from '@make.org/api/ApiService/ApiService.server';

/**
 * Warning : Do not put cache. This will be handle on API side
 * @param {string} questionId
 * @param {string} country
 * @param {string} language
 * @param {() => void} notFound
 * @param {() => void} unexpectedError
 * @returns Promise<FirstProposalSequenceType | void>
 */
const getFirstProposal = async (
  questionId: string,
  country: string,
  language: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<FirstProposalSequenceType | void> => {
  const handleData = (data: FirstProposalSequenceType) => {
    if (!data) {
      return notFound();
    }

    return data;
  };

  try {
    const response = await QuestionApiService.startSequenceFirstProposal(
      questionId,
      {
        'x-make-question-id': questionId,
        'x-make-country': country,
        'x-make-language': language,
        'x-make-location': 'widget',
      }
    );

    apiServer.sessionId = response?.headers['x-session-id'];
    return handleData(response?.data);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/service/FirstProposalService/getFirstProposal: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

export const FirstProposalService = {
  getFirstProposal,
};
