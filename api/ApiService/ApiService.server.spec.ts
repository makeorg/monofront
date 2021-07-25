import { ApiServiceShared } from './ApiService.shared';
import { ApiServiceServer } from './ApiService.server';

jest.mock('./ApiService.shared');

jest.mock('https');

describe('ApiServiceServer', () => {
  let apiServer: ApiServiceServer;
  beforeEach(() => {
    ApiServiceShared.callApi.mockClear();
    jest.spyOn(ApiServiceShared, 'callApi');
    apiServer = new ApiServiceServer();
  });

  it('callApi must call ApiServiceShared.callApi', () => {
    // given
    const url = '/api/endpoint';
    const options = { headers: { value: 'value' } };
    // when
    apiServer.callApi(url, options);
    // then
    expect(ApiServiceShared.callApi).toHaveBeenNthCalledWith(1, url, {
      headers: {
        ...options.headers,
        'x-make-source': 'core',
      },
      httpsAgent: {},
    });
  });

  it('callApi must call ApiServiceShared.callApi with custom location', () => {
    // given
    const url = '/api/endpoint';
    const options = { headers: { 'x-make-location': 'custom' } };
    // when
    apiServer.callApi(url, options);
    // then
    expect(ApiServiceShared.callApi).toHaveBeenNthCalledWith(1, url, {
      headers: { 'x-make-location': 'custom', 'x-make-source': 'core' },
      httpsAgent: {},
    });
  });

  it('language property must be disable', () => {
    expect(apiServer.language).toBe(undefined);
  });

  it('source property must be disable', () => {
    expect(apiServer.source).toBe(undefined);
  });

  it('country property must be disable', () => {
    expect(apiServer.country).toBe(undefined);
  });
});
