import { FirstProposalSequenceType } from '@make.org/types';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';
import { getWidgetLocation } from '../../utils/helpers/location';

/**
 * Warning : Do not put cache. This will be handle on API side
 * @param {string} questionId
 * @param {string} country
 * @param {string} language
 * @param {() => void} notFound
 * @param {() => void} unexpectedError
 * @param {string} sequenceKind
 * @returns Promise<{ data: FirstProposalSequenceType; sessionId: string } | void>
 */
const getFirstProposal = async (
  questionId: string,
  country: string,
  notFound: () => void,
  unexpectedError: () => void,
  preferedLanguage: string,
  sequenceKind?: string
): Promise<{ data: FirstProposalSequenceType; sessionId: string } | void> => {
  const handleData = (data: FirstProposalSequenceType, sessionId: string) => {
    if (!data) {
      return notFound();
    }

    return { data, sessionId: sessionId || '' };
  };

  const widgetLocation = getWidgetLocation(sequenceKind);

  try {
    const response = await QuestionApiService.startSequenceFirstProposal(
      questionId,
      preferedLanguage,
      sequenceKind,
      {
        'x-make-question-id': questionId,
        'x-make-country': country,
        'x-make-language': preferedLanguage,
        'x-make-location': widgetLocation,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      }
    );

    return handleData(response?.data, response?.headers['x-session-id'] || '');
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
