import { QuestionType } from '@make.org/types/Question';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import cache from 'memory-cache';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';
import {
  ApiServiceHeadersType,
  DemographicDataType,
  ProposalType,
  SequenceType,
} from '@make.org/types';
import {
  getOrderedProposals,
  removeDuplicatedAndVotedProposals,
} from '@make.org/utils/helpers/proposal';
import { logSequenceCornerCases } from '@make.org/utils/helpers/sequence';
import { defaultUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';

const clearCache = (): void => {
  cache.clear();
};

const getQuestion = async (
  questionIdOrSlug: string,
  country: string,
  notFound: () => void,
  unexpectedError: () => void,
  preferedLanguage: string
): Promise<QuestionType | void> => {
  const upperCountry = country.toUpperCase();
  const handleData = (data: QuestionType) => {
    if (!data.countries?.includes(upperCountry) || !data) {
      return notFound();
    }

    return data;
  };

  const CACHE_KEY = `QUESTION_${questionIdOrSlug}`;
  const content = cache.get(CACHE_KEY);
  if (content) {
    return handleData(content);
  }

  try {
    const response = await QuestionApiService.getDetail(
      questionIdOrSlug,
      preferedLanguage,
      {
        'x-make-question-id': questionIdOrSlug,
        'x-make-country': upperCountry,
        'x-make-language': preferedLanguage,
      }
    );

    const formattedResponse = response && {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };

    cache.put(CACHE_KEY, formattedResponse, 300000);

    return handleData(formattedResponse);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/service/QuestionService/getQuestion: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

/**
 * Start sequence by kind
 * !!! Warning, the reponse must not be kept in cache !!!
 * @param  {String} questionId
 * @param  {String} country
 * @param  {String} language
 * @param  {String} sequenceKind
 * @param  {Array<String>} votedIds
 * @param  {String} sessionId?
 * @param  {String} demographicsCardId?
 * @param  {Object} headers?
 *
 * @return {Promise}
 */
const startSequenceByKind = async (
  questionId: string,
  includedProposalIds: string[],
  sequenceKind: string,
  mandatoryRequestHeaders: ApiServiceHeadersType,
  preferedLanguage?: string
): Promise<{ sequence: SequenceType; sessionId: string } | void> => {
  try {
    const response = await QuestionApiService.startSequenceByKind(
      questionId,
      includedProposalIds,
      sequenceKind,
      undefined,
      undefined,
      preferedLanguage,
      mandatoryRequestHeaders
    );

    if (!response) {
      return;
    }

    const { data } = response;
    const orderedProposals = getOrderedProposals(
      data.proposals,
      includedProposalIds
    );
    const {
      unique: uniqueOrderedProposals,
      duplicates,
      voted,
    } = orderedProposals.reduce(
      removeDuplicatedAndVotedProposals(includedProposalIds),
      {
        unique: [],
        duplicates: [],
        voted: [],
      }
    );

    logSequenceCornerCases(
      questionId,
      duplicates,
      voted,
      uniqueOrderedProposals
    );

    const formatResponse = (
      proposals: ProposalType[],
      demographics: DemographicDataType,
      length: number
    ) => ({
      proposals,
      demographics,
      length,
    });

    const sequence = formatResponse(
      uniqueOrderedProposals,
      data.demographics as DemographicDataType,
      uniqueOrderedProposals.length
    );

    // eslint-disable-next-line consistent-return
    return {
      sequence,
      sessionId: response?.headers['x-session-id'],
    };
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
  }
};

export const QuestionService = {
  getQuestion,
  clearCache,
  startSequenceByKind,
};
