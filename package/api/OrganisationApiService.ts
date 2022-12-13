import { AxiosResponse } from 'axios';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { OrganisationVotesType } from '@make.org/types';
import { ApiService } from './ApiService';

const ORGANISATIONS_PATH = '/organisations';
const ORGANISATION_PROPOSALS_PATH = '/organisations/:organisationId/proposals';
const ORGANISATION_VOTES_PATH = '/organisations/:organisationId/votes';
const ORGANISATION_PROFILE = '/organisations/:organisationId/profile';

export class OrganisationApiService {
  static getOrganisations(slug: string): Promise<void | AxiosResponse> {
    return ApiService.callApi(ORGANISATIONS_PATH, {
      method: 'GET',
      params: {
        slug,
      },
    });
  }

  static search(country: string, query: string): Promise<void | AxiosResponse> {
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
    preferedLanguage?: string,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      ORGANISATION_PROPOSALS_PATH.replace(':organisationId', organisationId),
      {
        method: 'GET',
        params: {
          sort: 'createdAt',
          order: 'desc',
          limit,
          skip,
          preferedLanguage,
        },
      }
    );
  }

  static getProfile(organisationId: string): Promise<void | AxiosResponse> {
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
    optInNewsletter: boolean,
    crmCountry: string,
    crmLanguage: string
  ): Promise<void | AxiosResponse> {
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
          crmCountry,
          crmLanguage,
        }),
      }
    );
  }

  static getOrganisationVotes(
    organisationId: string,
    seed?: number,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): Promise<void | AxiosResponse<OrganisationVotesType>> {
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
