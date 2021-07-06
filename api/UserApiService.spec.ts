import { ApiService } from 'Shared/api/ApiService';
import { getDateOfBirthFromAge } from 'Shared/helpers/date';
import { PROPOSALS_LISTING_LIMIT } from 'Shared/constants/proposal';
import {
  UserApiService,
  PATH_USER,
  PATH_USER_PROPOSALS,
  PATH_USER_FAVOURITES,
  PATH_USER_PRIVACY_POLICY,
  PATH_USER_SOCIAL_PRIVACY_POLICY,
} from './UserApiService';

jest.mock('./ApiService');
Object.defineProperty(ApiService, 'country', {
  get: jest.fn(() => 'FR'),
  set: jest.fn(),
});
Object.defineProperty(ApiService, 'language', {
  get: jest.fn(() => 'fr'),
  set: jest.fn(),
});
Object.defineProperty(ApiService, 'questionId', {
  get: jest.fn(() => 'quux'),
  set: jest.fn(),
});
jest.mock('Shared/helpers/date', () => ({
  getDateOfBirthFromAge: jest.fn(),
}));

describe('UserApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
  });

  describe('register', () => {
    it('must call ApiService.callApi', async () => {
      getDateOfBirthFromAge.mockReturnValue('1988-03-03');
      await UserApiService.register({
        email: 'foo',
        password: 'bar',
        profile: {
          firstname: 'baz',
          age: 33,
          postalcode: 12345,
          profession: 'qux',
          approvePrivacyPolicy: true,
        },
      });
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_USER, {
        method: 'POST',
        body: JSON.stringify({
          email: 'foo',
          password: 'bar',
          firstName: 'baz',
          dateOfBirth: '1988-03-03',
          postalCode: 12345,
          profession: 'qux',
          country: 'FR',
          language: 'fr',
          questionId: 'quux',
          approvePrivacyPolicy: true,
        }),
      });
    });

    it('must call ApiService.callApi with nullable birdthdate', async () => {
      getDateOfBirthFromAge.mockReturnValue('');
      await UserApiService.register({
        email: 'foo',
        password: 'bar',
        profile: {
          firstname: 'baz',
          age: 33,
          postalcode: 12345,
          profession: 'qux',
        },
      });
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_USER, {
        method: 'POST',
        body: JSON.stringify({
          email: 'foo',
          password: 'bar',
          firstName: 'baz',
          dateOfBirth: null,
          postalCode: 12345,
          profession: 'qux',
          country: 'FR',
          language: 'fr',
          questionId: 'quux',
        }),
      });
    });
  });

  describe('my proposals', () => {
    it('must call ApiService.callApi', async () => {
      await UserApiService.myProposals('foo');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_USER_PROPOSALS.replace(':userId', 'foo'),
        {
          method: 'GET',
          params: {
            sort: 'createdAt',
            order: 'desc',
            seed: null,
            limit: PROPOSALS_LISTING_LIMIT,
            skip: 0,
          },
        }
      );
    });
  });

  describe('my favourites', () => {
    it('must call ApiService.callApi', async () => {
      await UserApiService.myFavourites('foo');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_USER_FAVOURITES.replace(':userId', 'foo'),
        {
          method: 'GET',
          params: {
            qualifications: 'likeIt',
            limit: PROPOSALS_LISTING_LIMIT,
            skip: 0,
          },
        }
      );
    });
  });

  describe('login privacy policy', () => {
    it('must call ApiService.callApi', async () => {
      await UserApiService.loginPrivacyPolicy('foo', 'bar');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_USER_PRIVACY_POLICY,
        {
          method: 'POST',
          headers: {},
          body: JSON.stringify({
            email: 'foo',
            password: 'bar',
          }),
        }
      );
    });
  });

  describe('social login privacy policy', () => {
    it('must call ApiService.callApi', async () => {
      await UserApiService.socialPrivacyPolicy('foo', 'bar');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_USER_SOCIAL_PRIVACY_POLICY,
        {
          method: 'POST',
          headers: {},
          body: JSON.stringify({
            provider: 'foo',
            token: 'bar',
          }),
        }
      );
    });
  });
});
