import { ApiService, IApiServiceStrategy } from './index';
import { ApiServiceMock } from './ApiService.mock';

describe('ApiService', () => {
  let mockStrategy: IApiServiceStrategy;
  beforeEach(() => {
    mockStrategy = new ApiServiceMock();
    ApiService.strategy = mockStrategy;
  });

  it('get mock strategy instance', () => {
    expect(ApiService.strategy).toBe(mockStrategy);
  });

  it('all getter must return foo', () => {
    expect(ApiService.language).toBe('foo');
    expect(ApiService.country).toBe('foo');
    expect(ApiService.source).toBe('foo');
    expect(ApiService.questionId).toBe('foo');
  });

  it('callApi must call strategy.callApi', () => {
    // Given
    jest.spyOn(mockStrategy, 'callApi');
    const url = 'http://url.fr';
    const options = { headers: { 'x-make-app-name': 'test' }, method: 'get' };
    // When
    ApiService.callApi(url, options);
    // Then
    expect(mockStrategy.callApi).toHaveBeenNthCalledWith(1, url, options);
  });
});
