import {
  PersonalityCommentsType,
  PersonalityOpinionType,
  PersonalityProfileType,
  ErrorObjectType,
  UserType
} from '@make.org/types';
import { PersonalityApiService } from '@make.org/api/PersonalityApiService';
import { getErrorMessages } from '@make.org/utils/helpers/form';
import { updatePersonalityErrors } from '@make.org/utils/errors/Messages/Personality';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getPersonalityById = async (userId: string): Promise<?UserType> => {
  try {
    const response = await PersonalityApiService.getPersonality(userId);

    return response.data;
  } catch (apiServiceError) {
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
): Promise<?PersonalityCommentsType> => {
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

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getPersonnalityOpinion = async (
  personalityId: string,
  questionId?: string
): Promise<?(PersonalityOpinionType[]
)> => {
  try {
    const response = await PersonalityApiService.getPersonnalityOpinion(
      personalityId,
      questionId
    );
    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (personalityId: string): any => {
  try {
    const response = await PersonalityApiService.getProfile(personalityId);

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
  personalityId: string,
  profile: PersonalityProfileType,
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
    } = profile;
    await PersonalityApiService.update(
      personalityId,
      firstName,
      lastName,
      avatarUrl,
      description,
      website,
      optInNewsletter,
      politicalParty
    );

    success();
  } catch (apiServiceError) {
    if (apiServiceError.status === 400) {
      handleErrors(
        getErrorMessages(
          updatePersonalityErrors,
          apiServiceError.data,
          apiServiceError.logId
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
