import { FirstProposalSequenceType } from '@make.org/types';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';

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
      }
    );

    return handleData(response && response.data);
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
