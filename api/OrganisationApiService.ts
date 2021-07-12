import { AxiosPromise, AxiosResponse } from 'axios';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { ApiService } from './ApiService';

export const ORGANISATIONS_PATH = '/organisations';
export const ORGANISATION_PROPOSALS_PATH = '/organisations/:organisationId/proposals';
export const ORGANISATION_VOTES_PATH = '/organisations/:organisationId/votes';
export const ORGANISATION_PROFILE = '/organisations/:organisationId/profile';

export class OrganisationApiService {
  static getOrganisations(slug: string): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(ORGANISATIONS_PATH, {
      method: 'GET',
      params: {
        slug,
      },
    });
  }

  static search(country: string, query: string): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(ORGANISATIONS_PATH, {
      method: 'GET',
      params: {
        country,
        organisationName: query,
      },
    });
  }

  static getOrganisationProposals(
    organisationId: string,
    seed?: number,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      ORGANISATION_PROPOSALS_PATH.replace(':organisationId', organisationId),
      {
        method: 'GET',
        params: { sort: 'createdAt', order: 'desc', seed, limit, skip },
      }
    );
  }

  static getProfile(organisationId: string): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      ORGANISATION_PROFILE.replace(':organisationId', organisationId),
      {
        method: 'GET',
      }
    );
  }

  static update(
    organisationId: string,
    organisationName: string,
    avatarUrl: string,
    description: string,
    website: string,
    optInNewsletter: boolean
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      ORGANISATION_PROFILE.replace(':organisationId', organisationId),
      {
        method: 'PUT',
        body: JSON.stringify({
          organisationId,
          organisationName,
          avatarUrl,
          description,
          website,
          optInNewsletter,
        }),
      }
    );
  }

  static getOrganisationVotes(
    organisationId: string,
    seed?: number,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(
      ORGANISATION_VOTES_PATH.replace(':organisationId', organisationId),
      {
        method: 'GET',
        params: {
          votes: 'agree,disagree',
          seed,
          limit,
          skip,
        },
      }
    );
  }
}
