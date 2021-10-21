import { Method } from '@make.org/types';
import { ApiService, IApiServiceStrategy } from './index';
import { ApiServiceMock } from './ApiService.mock';

describe('ApiService', () => {
  let mockStrategy: IApiServiceStrategy;
  beforeEach(() => {
    mockStrategy = new ApiServiceMock();
    ApiService.strategy = mockStrategy;
  });

  it('get mock strategy instance', () => {
    expect(ApiService.strategy).toEqual(mockStrategy);
  });

  it('all getter must return foo', () => {
    expect(ApiService.language).toEqual('foo');
    expect(ApiService.country).toEqual('foo');
    expect(ApiService.source).toEqual('foo');
  });

  it('callApi must call strategy.callApi', () => {
    // Given
    jest.spyOn(mockStrategy, 'callApi');
    const url = 'http://url.fr';
    const options = {
      headers: { 'x-make-app-name': 'test' },
      method: 'get' as Method,
    };
    // When
    ApiService.callApi(url, options);
    // Then
    expect(mockStrategy.callApi).toHaveBeenNthCalledWith(1, url, options);
  });
});
