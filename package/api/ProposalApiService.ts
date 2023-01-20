import { ApiServiceHeadersType, ProposalsType } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_PROPOSALS = '/proposals';
const PATH_TOP_PROPOSALS = '/questions/:questionId/top-proposals';
const PATH_PROPOSAL_GET = '/proposals/:proposalId';

type TypeAvailableAlgorithms = {
  [name: string]: { key: string; value: string };
};

const AVAILABLE_ALGORITHMS: TypeAvailableAlgorithms = {
  TAGGED_FIRST: { key: 'sortAlgorithm', value: 'taggedFirst' },
  POPULAR: { key: 'sortAlgorithm', value: 'popular' },
  ACTORS: { key: 'userType', value: 'ORGANISATION,PERSONALITY' },
  REALISTIC: { key: 'sortAlgorithm', value: 'realistic' },
  CONTROVERSY: { key: 'sortAlgorithm', value: 'controversy' },
  TOP_SCORE: { key: 'sort', value: 'scores.topScoreAjustedWithVotes' },
  CONTENT: { key: 'sort', value: 'content' },
  SLUG: { key: 'sort', value: 'slug' },
  RECENT: { key: 'sort', value: 'createdAt' },
  UPDATED: { key: 'sort', value: 'updatedAt' },
  TRENDING: { key: 'sort', value: 'trending' },
  LABELS: { key: 'sort', value: 'labels' },
  COUNTRY: { key: 'sort', value: 'country' },
  LANGUAGE: { key: 'sort', value: 'language' },
};

export class ProposalApiService {
  static propose(
    content: string,
    questionId: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_PROPOSALS, {
      method: 'POST',
      body: JSON.stringify({
        content,
        questionId,
        country: ApiService.country,
        language: ApiService.language,
      }),
    });
  }

  static getProposal(
    proposalId: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_PROPOSAL_GET.replace(':proposalId', proposalId),
      {
        method: 'GET',
        headers,
        proposalId,
      }
    );
  }

  static getPopularProposals(
    questionId: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_TOP_PROPOSALS.replace(':questionId', questionId),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static searchProposals(
    country: string,
    questionId?: string,
    content?: string,
    tagsIds?: string,
    seed?: number,
    limit?: number,
    skip?: number,
    sort?: string,
    order?: string,
    ideaIds?: string,
    sortAlgorithm?: string,
    keywords?: string,
    isNotVoted?: boolean,
    userType?: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse<ProposalsType>> {
    const params: Record<string, string | boolean | number | undefined> = {
      country,
      questionId,
      content,
      tagsIds,
      seed,
      limit: limit || 20,
      skip: skip || 0,
      sort,
      order,
      ideaIds,
      sortAlgorithm,
      keywords,
      isNotVoted,
      userType,
    };

    if (sort) {
      const sortType = AVAILABLE_ALGORITHMS[sort];
      params[sortType.key] = sortType.value;

      if (AVAILABLE_ALGORITHMS[sort].key === 'sort') {
        params.order = 'DESC';
      }
    }
    return ApiService.callApi(PATH_PROPOSALS, {
      method: 'GET',
      headers,
      params,
    });
  }
}
