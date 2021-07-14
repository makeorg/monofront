import { ApiServiceHeadersType } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

export const PERSONALITY_PATH = '/personalities/:personalityId';
export const PERSONALITY_COMMENTS_PATH =
  '/personalities/:personalityId/comments';
export const PERSONALITY_OPINION_PATH =
  '/personalities/:personalityId/opinions';
export const PERSONALITY_PROFILE = '/personalities/:personalityId/profile';

export class PersonalityApiService {
  static getPersonality(
    personalityId: string,
    questionId?: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PERSONALITY_PATH.replace(':personalityId', personalityId),
      {
        method: 'GET',
        headers,
        body: JSON.stringify({
          questionId,
        }),
      }
    );
  }

  static postPersonnalityComments(
    personalityId: string,
    topIdeaId: string,
    comment1: string,
    comment2: string,
    comment3: string,
    vote: string,
    qualification: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PERSONALITY_COMMENTS_PATH.replace(':personalityId', personalityId),
      {
        method: 'POST',
        body: JSON.stringify({
          topIdeaId,
          comment1,
          comment2,
          comment3,
          vote,
          qualification,
        }),
        headers,
      }
    );
  }

  static getPersonnalityOpinion(
    personalityId: string,
    questionId?: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PERSONALITY_OPINION_PATH.replace(':personalityId', personalityId),
      {
        method: 'GET',
        headers,
        body: JSON.stringify({
          questionId,
        }),
      }
    );
  }

  static getProfile(personalityId: string): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PERSONALITY_PROFILE.replace(':personalityId', personalityId),
      {
        method: 'GET',
      }
    );
  }

  static update(
    personalityId: string,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    description: string,
    website: string,
    optInNewsletter: boolean,
    politicalParty: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PERSONALITY_PROFILE.replace(':personalityId', personalityId),
      {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          avatarUrl,
          description,
          website,
          optInNewsletter,
          politicalParty,
        }),
      }
    );
  }
}
