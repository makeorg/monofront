import { ApiService } from 'Shared/api/ApiService';
import {
  PersonalityApiService,
  PERSONALITY_PATH,
  PERSONALITY_OPINION_PATH,
  PERSONALITY_COMMENTS_PATH,
} from './PersonalityApiService';

jest.mock('./ApiService');

describe('PersonalityApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
  });

  describe('getPersonality', () => {
    it('must call ApiService.callApi', async () => {
      await PersonalityApiService.getPersonality('1234');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PERSONALITY_PATH.replace(':personalityId', '1234'),
        {
          method: 'GET',
          headers: {},
          body: JSON.stringify({}),
        }
      );
    });
  });

  describe('postPersonnalityComments', () => {
    it('must call ApiService.callApi', async () => {
      await PersonalityApiService.postPersonnalityComments(
        '1234',
        '5678',
        'fooComment1',
        'barComment2',
        'bazComment3',
        'fooVote',
        'fooQualification'
      );
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PERSONALITY_COMMENTS_PATH.replace(':personalityId', '1234'),
        {
          method: 'POST',
          headers: {},
          body: JSON.stringify({
            topIdeaId: '5678',
            comment1: 'fooComment1',
            comment2: 'barComment2',
            comment3: 'bazComment3',
            vote: 'fooVote',
            qualification: 'fooQualification',
          }),
        }
      );
    });
  });

  describe('getPersonnalityOpinion', () => {
    it('getPersonnalityOpinion without questionId', async () => {
      await PersonalityApiService.getPersonnalityOpinion('1234');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PERSONALITY_OPINION_PATH.replace(':personalityId', '1234'),
        {
          method: 'GET',
          headers: {},
          body: JSON.stringify({
            questionId: undefined,
          }),
        }
      );
    });

    it('getPersonnalityOpinion with questionId', async () => {
      await PersonalityApiService.getPersonnalityOpinion('1234', '5678');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PERSONALITY_OPINION_PATH.replace(':personalityId', '1234'),
        {
          method: 'GET',
          headers: {},
          body: JSON.stringify({
            questionId: '5678',
          }),
        }
      );
    });
  });
});
