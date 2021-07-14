import { OrganisationApiService } from '@make.org/api/OrganisationApiService';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import {
  OrganisationsType,
  OrganisationType,
  OrganisationVotesType,
  OrganisationProfileType,
  ProposalsType,
  ErrorObjectType,
} from '@make.org/types';
import { updateOrganisationErrors } from '@make.org/utils/errors/Messages/Organisation';
import { getErrorMessages } from '@make.org/utils/helpers/form';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const searchOrganisations = async (
  country: string,
  content: string
): Promise<OrganisationsType> => {
  try {
    const response = await OrganisationApiService.search(country, content);

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getOrganisationBySlug = async (
  slug: string
): Promise<OrganisationType> => {
  try {
    const response = await OrganisationApiService.getOrganisations(slug);

    const organisation = response.data.results.find(
      result => result.slug === slug
    );

    if (!organisation) {
      return null;
    }

    return organisation;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProposals = async (
  organisationId: string,
  seed?: number,
  page = 0
): Promise<ProposalsType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;

  try {
    const response = await OrganisationApiService.getOrganisationProposals(
      organisationId,
      seed,
      limit,
      skip
    );

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getVotes = async (
  organisationId: string,
  seed?: number,
  page = 0
): Promise<OrganisationVotesType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;

  try {
    const response = await OrganisationApiService.getOrganisationVotes(
      organisationId,
      seed,
      limit,
      skip
    );
    const { results } = response.data;

    const proposals = results.map(result => result.proposal);

    const organisationVotes = results.map(result => {
      const Proposal = proposals.find(
        proposal => proposal.id === result.proposal.id
      );
      return {
        ...result,
        proposal: Proposal,
      };
    });

    return {
      results: organisationVotes,
      total: response.total,
      seed: response.seed,
    };
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (
  organisationId: string
): Promise<OrganisationProfileType | null> => {
  try {
    const response = await OrganisationApiService.getProfile(organisationId);

    return response.data;
  } catch (apiServiceError) {
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
): Promise<void> => {
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
  } catch (apiServiceError) {
    if (apiServiceError.status === 400) {
      handleErrors(
        getErrorMessages(
          updateOrganisationErrors,
          apiServiceError.data,
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
