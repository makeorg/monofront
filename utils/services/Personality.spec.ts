import { PersonalityApiService } from '@make.org/api/PersonalityApiService';
import { PersonalityService } from '@make.org/utils/services/Personality';

jest.mock('@make.org/api/PersonalityApiService');
jest.mock('@make.org/utils/services/Logger');

describe('PersonalityApiService Service', () => {
  describe('getPersonalityId function', () => {
    it('getPersonalityId without questionId', async () => {
      jest.spyOn(PersonalityApiService, 'getPersonality');
      await PersonalityService.getPersonalityById('1234');

      expect(PersonalityApiService.getPersonality).toHaveBeenNthCalledWith(
        1,
        '1234'
      );
    });
  });

  describe('postPersonnalityComments function', () => {
    it('postPersonnalityComments', async () => {
      jest.spyOn(PersonalityApiService, 'postPersonnalityComments');
      await PersonalityService.postPersonnalityComments(
        '1234',
        '5678',
        'fooComment1',
        'barComment2',
        'bazComment3',
        'fooVote',
        'fooQualification'
      );

      expect(
        PersonalityApiService.postPersonnalityComments
      ).toHaveBeenNthCalledWith(
        1,
        '1234',
        '5678',
        'fooComment1',
        'barComment2',
        'bazComment3',
        'fooVote',
        'fooQualification'
      );
    });
  });

  describe('getPersonalityOpinion function', () => {
    afterEach(() => {
      PersonalityApiService.getPersonnalityOpinion.mockRestore();
    });

    it('getPersonalityOpinion without questionId', async () => {
      jest.spyOn(PersonalityApiService, 'getPersonnalityOpinion');
      await PersonalityService.getPersonnalityOpinion('1234', undefined);

      expect(
        PersonalityApiService.getPersonnalityOpinion
      ).toHaveBeenNthCalledWith(1, '1234', undefined);
    });

    it('getPersonalityOpinion with questionId', async () => {
      jest.spyOn(PersonalityApiService, 'getPersonnalityOpinion');
      await PersonalityService.getPersonnalityOpinion('1234', '5678');

      expect(
        PersonalityApiService.getPersonnalityOpinion
      ).toHaveBeenNthCalledWith(1, '1234', '5678');
    });
  });
});
