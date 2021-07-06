import { ApiServiceShared } from './ApiService.shared';
import { ApiServiceClient } from './ApiService.client';
import { getLocationContext } from './getLocationContext';

jest.mock('./ApiService.shared');

jest.mock('./getLocationContext');

describe('ApiServiceClient', () => {
  let apiClient: ApiServiceClient;
  beforeEach(() => {
    jest.spyOn(ApiServiceShared, 'callApi');
    ApiServiceShared.callApi.mockResolvedValue({});
    getLocationContext.mockImplementation(() => 'unknown_location /');
    apiClient = new ApiServiceClient();
  });

  afterEach(() => {
    ApiServiceShared.callApi.mockRestore();
    getLocationContext.mockRestore();
    apiClient = undefined;
  });

  it('callApi must call ApiServiceShared.callApi by default', () => {
    // given
    const url = '/api/endpoint';
    const options = { headers: { value: 'value' } };
    // when
    apiClient.callApi(url, options);
    // then
    expect(ApiServiceShared.callApi).toHaveBeenNthCalledWith(1, url, {
      ...options,
      ...{
        headers: {
          'x-make-country': '',
          'x-make-custom-data': '',
          'x-make-language': '',
          'x-make-question-id': '',
          'x-make-referrer': '',
          'x-make-source': '',
          'x-make-location': 'unknown_location /',
          ...options.headers,
        },
      },
    });
  });

  it('callApi must call getLocationContext with params', () => {
    // given
    const url = '/api/endpoint';
    const options = { proposalId: 'proposalId' };
    apiClient.questionId = '1234';
    // when
    apiClient.callApi(url, options);
    // then
    expect(getLocationContext).toHaveBeenNthCalledWith(
      1,
      '/',
      '1234',
      'proposalId'
    );
  });

  it('callApi must call ApiServiceShared.callApi with headers', () => {
    // given
    const url = '/api/endpoint';
    const options = { headers: { value: 'value' }, proposalId: 'abcd_propose' };
    // when
    apiClient.language = 'fr';
    apiClient.country = 'FR';
    apiClient.source = 'core';
    apiClient.questionId = '1234';
    apiClient.referrer = 'http://localhost';
    apiClient.customData = 'key=value';
    apiClient.callApi(url, options);
    // then
    expect(ApiServiceShared.callApi).toHaveBeenNthCalledWith(1, url, {
      ...options,
      ...{
        headers: {
          'x-make-country': 'FR',
          'x-make-custom-data': 'key=value',
          'x-make-language': 'fr',
          'x-make-question-id': '1234',
          'x-make-referrer': 'http://localhost',
          'x-make-source': 'core',
          'x-make-location': 'unknown_location /',
          ...options.headers,
        },
      },
    });
  });

  it('language property must be enabled', () => {
    expect(apiClient.language).toBe('');
    apiClient.language = 'fr';
    expect(apiClient.language).toBe('fr');
  });

  it('source property must be enabled', () => {
    expect(apiClient.source).toBe('');
    apiClient.source = 'core';
    expect(apiClient.source).toBe('core');
  });

  it('country property must be enabled', () => {
    expect(apiClient.country).toBe('');
    apiClient.country = 'FR';
    expect(apiClient.country).toBe('FR');
  });

  it('questionId property must be enabled', () => {
    expect(apiClient.questionId).toBe('');
    apiClient.questionId = '1234';
    expect(apiClient.questionId).toBe('1234');
  });
});
