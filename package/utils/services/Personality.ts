import {
  PersonalityCommentsType,
  PersonalityOpinionType,
  PersonalityProfileType,
  ErrorObjectType,
  UserProfileType,
  PersonalityType,
  ILogger,
} from '@make.org/types';
import { PersonalityApiService } from '@make.org/api/services/PersonalityApiService';
import { getErrorMessages } from '@make.org/utils/helpers/form';
import { updatePersonalityErrors } from '@make.org/utils/errors/Messages/Personality';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getPersonalityById = async (
  userId: string
): Promise<null | (PersonalityType & { profile: PersonalityProfileType })> => {
  try {
    const response = await PersonalityApiService.getPersonality(userId);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const postPersonnalityComments = async (
  personalityId: string,
  topIdeaId: string,
  comment1: string,
  comment2: string,
  comment3: string,
  vote: string,
  qualification: string
): Promise<null | PersonalityCommentsType> => {
  try {
    const response = await PersonalityApiService.postPersonnalityComments(
      personalityId,
      topIdeaId,
      comment1,
      comment2,
      comment3,
      vote,
      qualification
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getPersonnalityOpinion = async (
  personalityId: string,
  questionId?: string
): Promise<null | PersonalityOpinionType[]> => {
  try {
    const response = await PersonalityApiService.getPersonnalityOpinion(
      personalityId,
      questionId
    );
    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (
  personalityId: string
): Promise<null | UserProfileType> => {
  try {
    const response = await PersonalityApiService.getProfile(personalityId);

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
  personalityId: string,
  profile: PersonalityProfileType,
  logger: ILogger,
  success: () => void,
  handleErrors: (errors: ErrorObjectType[]) => void
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      avatarUrl,
      description,
      website,
      optInNewsletter,
      politicalParty,
      crmCountry,
      crmLanguage,
    } = profile;
    await PersonalityApiService.update(
      personalityId,
      firstName,
      lastName,
      avatarUrl,
      description,
      website,
      optInNewsletter,
      politicalParty,
      crmCountry,
      crmLanguage
    );

    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 400) {
      handleErrors(
        getErrorMessages(
          updatePersonalityErrors,
          apiServiceError.data as ErrorObjectType[] | ErrorObjectType,
          apiServiceError.logId,
          logger
        )
      );
      return;
    }

    defaultUnexpectedError(apiServiceError);
  }
};

export const PersonalityService = {
  getPersonalityById,
  postPersonnalityComments,
  getPersonnalityOpinion,
  getProfile,
  update,
};
