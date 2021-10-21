import { OrganisationApiService } from '@make.org/api/OrganisationApiService';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import {
  OrganisationsType,
  OrganisationType,
  OrganisationVotesType,
  OrganisationProfileType,
  ProposalsType,
  ErrorObjectType,
  OrganisationVoteType,
  ProposalType,
} from '@make.org/types';
import { updateOrganisationErrors } from '@make.org/utils/errors/Messages/Organisation';
import { getErrorMessages } from '@make.org/utils/helpers/form';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const searchOrganisations = async (
  country: string,
  content: string
): Promise<null | OrganisationsType> => {
  try {
    const response = await OrganisationApiService.search(country, content);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getOrganisationBySlug = async (
  slug: string
): Promise<null | OrganisationType> => {
  try {
    const response = await OrganisationApiService.getOrganisations(slug);

    const organisation =
      response &&
      response.data.results.find(
        (result: OrganisationType) => result.slug === slug
      );

    if (!organisation) {
      return null;
    }

    return organisation;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProposals = async (
  organisationId: string,
  seed?: number,
  page = 0
): Promise<null | ProposalsType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;

  try {
    const response = await OrganisationApiService.getOrganisationProposals(
      organisationId,
      seed,
      limit,
      skip
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getVotes = async (
  organisationId: string,
  initialSeed?: number,
  page = 0
): Promise<null | OrganisationVotesType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;

  try {
    const response = await OrganisationApiService.getOrganisationVotes(
      organisationId,
      initialSeed,
      limit,
      skip
    );

    if (!response) {
      return null;
    }

    const { results, total, seed } = response && response.data;

    if (!results) {
      return null;
    }

    const proposals = results.map(
      (result: OrganisationVoteType) => result.proposal
    );

    const organisationVotes: OrganisationVoteType[] = results.map(
      (result: OrganisationVoteType) => {
        const Proposal = proposals.find(
          (proposal: ProposalType) => proposal.id === result.proposal.id
        );
        if (!Proposal) {
          return {
            ...result,
          };
        }

        return {
          ...result,
          proposal: Proposal,
        };
      }
    );

    return {
      results: organisationVotes,
      total,
      seed,
    };
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (
  organisationId: string
): Promise<null | OrganisationProfileType | null> => {
  try {
    const response = await OrganisationApiService.getProfile(organisationId);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 401) {
      return null;
    }
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const update = async (
  organisationId: string,
  profile: OrganisationProfileType,
  success: () => void,
  handleErrors: (errors: ErrorObjectType[]) => void
): Promise<null | void> => {
  try {
    const {
      organisationName,
      avatarUrl,
      description,
      website,
      optInNewsletter,
    } = profile;
    await OrganisationApiService.update(
      organisationId,
      organisationName,
      avatarUrl,
      description,
      website,
      optInNewsletter
    );

    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 400) {
      handleErrors(
        getErrorMessages(
          updateOrganisationErrors,
          apiServiceError.data as ErrorObjectType[] | ErrorObjectType,
          apiServiceError.logId
        )
      );
      return;
    }

    defaultUnexpectedError(apiServiceError);
  }
};

export const OrganisationService = {
  searchOrganisations,
  getOrganisationBySlug,
  getProposals,
  getVotes,
  getProfile,
  update,
};
