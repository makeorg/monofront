import { generatePath } from 'react-router';
import { ApiServiceHeadersType } from '@make.org/types';
import { AxiosPromise, AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_QUESTIONS_LIST = '/questions';
const PATH_QUESTIONS_SEARCH = '/questions/search';
const PATH_QUESTION_DETAIL = '/questions/:questionSlugOrId/details';
const PATH_QUESTION_START_SEQUENCE = '/sequences/:sequenceKind/:questionId';
const PATH_QUESTION_START_SEQUENCE_KEYWORD = '/sequences/keyword/:questionId/:keywordKey';
const PATH_QUESTION_PARTNERS = '/questions/:questionId/partners';
const PATH_QUESTION_PERSONALITIES = '/questions/:questionId/personalities';
const PATH_QUESTION_POPULAR_TAGS = '/questions/:questionId/popular-tags';
const PATH_QUESTION_TOP_IDEAS = '/questions/:questionId/top-ideas';
const PATH_QUESTION_TOP_IDEA_DETAILS = '/questions/:questionId/top-ideas/:topIdeaId';
const PATH_QUESTION_FEATURED_PROPOSALS = '/questions/:questionId/featured-proposals';
export const PATH_QUESTION_KEYWORDS = '/questions/:questionId/keywords';

export class QuestionApiService {
  static getQuestions(
    country: string,
    status?: string, // Upcoming, Open, Finished
    sortAlgorithm?: string, // Chronological, Featured
    limit?: number,
    skip?: number,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(generatePath(PATH_QUESTIONS_LIST), {
      method: 'GET',
      headers,
      params: {
        country,
        status,
        sortAlgorithm,
        limit,
        skip,
      },
    });
  }

  static getQuestionPartners(
    questionId: string,
    partnerKind: string,
    sortAlgorithm?: string,
    limit?: number,
    skip?: number
  ): AxiosPromise<AxiosResponse> {
    const headers = {};
    return ApiService.callApi(
      generatePath(PATH_QUESTION_PARTNERS, { questionId }),
      {
        method: 'GET',
        headers,
        params: { sortAlgorithm, partnerKind, limit, skip },
      }
    );
  }

  static getDetail(
    questionSlugOrId: string,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_DETAIL.replace(':questionSlugOrId', questionSlugOrId),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static getQuestionPopularTags(
    questionId: string,
    limit?: number,
    skip?: number,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      generatePath(PATH_QUESTION_POPULAR_TAGS, { questionId }),
      { method: 'GET', headers, params: { limit, skip } }
    );
  }

  static getQuestionPersonalities(
    questionId: string,
    personalityRole?: string,
    limit?: number,
    skip?: number,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      generatePath(PATH_QUESTION_PERSONALITIES, { questionId }),
      { method: 'GET', headers, params: { personalityRole, limit, skip } }
    );
  }

  static startSequenceByKind(
    questionId: string,
    includedProposalIds: string[] = [],
    sequenceKind: string,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    let startSequenceUrl = PATH_QUESTION_START_SEQUENCE.replace(
      ':sequenceKind',
      sequenceKind
    ).replace(':questionId', questionId);
    // remove null value
    const includeParams = includedProposalIds
      .map((proposalId) => (proposalId ? `include=${proposalId}` : ''))
      .join('&');

    startSequenceUrl += includeParams ? `?${includeParams}` : '';

    return ApiService.callApi(startSequenceUrl, {
      method: 'GET',
      headers,
    });
  }

  static startSequenceByKeyword(
    questionId: string,
    includedProposalIds: string[] = [],
    keyword: string,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    let startSequenceUrl = PATH_QUESTION_START_SEQUENCE_KEYWORD.replace(
      ':questionId',
      questionId
    ).replace(':keywordKey', keyword);
    // remove null value
    const includeParams = includedProposalIds
      .map((proposalId) => (proposalId ? `include=${proposalId}` : ''))
      .join('&');

    startSequenceUrl += includeParams ? `?${includeParams}` : '';

    return ApiService.callApi(startSequenceUrl, {
      method: 'GET',
      headers,
    });
  }

  static searchQuestions(
    country: string,
    language: string,
    content: string,
    sort = 'endDate',
    order = 'DESC',
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(PATH_QUESTIONS_SEARCH, {
      method: 'GET',
      headers,
      params: {
        questionContent: content,
        country,
        language,
        sort,
        order,
      },
    });
  }

  static getTopIdeas(
    questionId: string,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_TOP_IDEAS.replace(':questionId', questionId),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static getTopIdea(
    questionId: string,
    topIdeaId: string,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_TOP_IDEA_DETAILS.replace(':questionId', questionId).replace(
        ':topIdeaId',
        topIdeaId
      ),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static getFeaturedProposals(
    questionId: string,
    maxPartnerProposals: number,
    limit: number,
    seed?: number,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_FEATURED_PROPOSALS.replace(':questionId', questionId),
      {
        method: 'GET',
        headers,
        params: {
          maxPartnerProposals,
          limit,
          seed,
        },
      }
    );
  }

  static getKeywords(
    questionId: string,
    limit: number,
    headers: ApiServiceHeadersType = {}
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_KEYWORDS.replace(':questionId', questionId),
      {
        method: 'GET',
        headers,
        params: {
          limit,
        },
      }
    );
  }
}
