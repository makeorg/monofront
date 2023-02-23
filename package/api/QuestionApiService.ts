import { generatePath } from 'react-router';
import { ApiServiceHeadersType } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { SEQUENCE } from '@make.org/types/enums';
import { ApiService } from './ApiService';

const PATH_QUESTIONS_LIST = '/questions';
const PATH_QUESTIONS_SEARCH = '/questions/search';
const PATH_QUESTION_DETAIL = '/questions/:questionSlugOrId/details';
const PATH_QUESTION_START_SEQUENCE = '/sequences/:sequenceKind/:questionId';
const PATH_QUESTION_START_SEQUENCE_FIRST_PROPOSAL =
  '/sequences/:sequenceKind/:questionId/first-proposal';
const PATH_QUESTION_START_SEQUENCE_KEYWORD =
  '/sequences/keyword/:questionId/:keywordKey';
const PATH_QUESTION_PARTNERS = '/questions/:questionId/partners';
const PATH_QUESTION_PERSONALITIES = '/questions/:questionId/personalities';
const PATH_QUESTION_POPULAR_TAGS = '/questions/:questionId/popular-tags';
const PATH_QUESTION_TOP_IDEAS = '/questions/:questionId/top-ideas';
const PATH_QUESTION_TOP_IDEA_DETAILS =
  '/questions/:questionId/top-ideas/:topIdeaId';
const PATH_QUESTION_FEATURED_PROPOSALS =
  '/questions/:questionId/featured-proposals';
const PATH_QUESTION_KEYWORDS = '/questions/:questionId/keywords';

export class QuestionApiService {
  static getQuestions(
    country: string,
    preferredLanguage: string,
    status?: string, // Upcoming, Open, Finished
    sortAlgorithm?: string, // Chronological, Featured
    limit?: number,
    skip?: number,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(generatePath(PATH_QUESTIONS_LIST), {
      method: 'GET',
      headers,
      params: {
        country,
        status,
        sortAlgorithm,
        limit,
        skip,
        preferredLanguage,
      },
    });
  }

  static getQuestionPartners(
    questionId: string,
    partnerKind: string,
    sortAlgorithm?: string,
    limit?: number,
    skip?: number
  ): Promise<void | AxiosResponse> {
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
    preferredLanguage: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_DETAIL.replace(':questionSlugOrId', questionSlugOrId),
      {
        method: 'GET',
        headers,
        params: {
          preferredLanguage,
        },
      }
    );
  }

  static getQuestionPopularTags(
    questionId: string,
    limit?: number,
    skip?: number,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
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
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      generatePath(PATH_QUESTION_PERSONALITIES, { questionId }),
      { method: 'GET', headers, params: { personalityRole, limit, skip } }
    );
  }

  static startSequenceFirstProposal(
    questionId: string,
    preferredLanguage: string,
    sequenceKind?: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    const startSequenceProposalUrl =
      PATH_QUESTION_START_SEQUENCE_FIRST_PROPOSAL.replace(
        ':sequenceKind',
        sequenceKind || SEQUENCE.KIND_STANDARD
      ).replace(':questionId', questionId);
    return ApiService.callApi(startSequenceProposalUrl, {
      method: 'GET',
      headers,
      params: {
        preferredLanguage,
      },
    });
  }

  static startSequenceByKind(
    questionId: string,
    // eslint-disable-next-line default-param-last
    includedProposalIds: string[] = [],
    sequenceKind: string,
    preferredLanguage: string,
    demographicsCardId?: string,
    token?: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    let startSequenceUrl = PATH_QUESTION_START_SEQUENCE.replace(
      ':sequenceKind',
      sequenceKind
    ).replace(':questionId', questionId);
    const includeParams = includedProposalIds
      .map(proposalId => (proposalId ? `include=${proposalId}` : ''))
      .join('&');

    const demographicParams =
      demographicsCardId && token
        ? `demographicsCardId=${encodeURIComponent(
            demographicsCardId
          )}&token=${encodeURIComponent(token)}`
        : '';

    const urlParams = [includeParams, demographicParams]
      .filter(el => el)
      .join('&');
    startSequenceUrl += urlParams ? `?${urlParams}` : '';

    return ApiService.callApi(startSequenceUrl, {
      method: 'GET',
      headers,
      params: {
        preferredLanguage,
      },
    });
  }

  static startSequenceByKeyword(
    questionId: string,
    // eslint-disable-next-line default-param-last
    includedProposalIds: string[] = [],
    keyword: string,
    preferredLanguage: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    let startSequenceUrl = PATH_QUESTION_START_SEQUENCE_KEYWORD.replace(
      ':questionId',
      questionId
    ).replace(':keywordKey', keyword);
    // remove null value
    const includeParams = includedProposalIds
      .map(proposalId => (proposalId ? `include=${proposalId}` : ''))
      .join('&');

    startSequenceUrl += includeParams ? `?${includeParams}` : '';

    return ApiService.callApi(startSequenceUrl, {
      method: 'GET',
      headers,
      params: {
        preferredLanguage,
      },
    });
  }

  static searchQuestions(
    country: string,
    content: string,
    preferredLanguage: string,
    sort = 'endDate',
    order = 'DESC',
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_QUESTIONS_SEARCH, {
      method: 'GET',
      headers,
      params: {
        questionContent: content,
        country,
        sort,
        order,
        preferredLanguage,
      },
    });
  }

  static getTopIdeas(
    questionId: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
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
  ): Promise<void | AxiosResponse> {
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
    preferredLanguage: string,
    limit: number,
    seed?: number,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_QUESTION_FEATURED_PROPOSALS.replace(':questionId', questionId),
      {
        method: 'GET',
        headers,
        params: {
          maxPartnerProposals,
          limit,
          seed,
          preferredLanguage,
        },
      }
    );
  }

  static getKeywords(
    questionId: string,
    limit: number,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
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
