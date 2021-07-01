import { ApiService } from './index';
import { ApiServiceMock } from './ApiService.mock';

describe('ApiService', () => {
  let mockStrategy;
  beforeEach(() => {
    mockStrategy = new ApiServiceMock();
    ApiService.strategy = mockStrategy;
  });

  it('get strategy throw an error by default', () => {
    ApiService.strategy = undefined;
    expect(() => ApiService.strategy).toThrow(
      new Error('No ApiService strategy configured')
    );
  });

  it('get mock strategy instance ', () => {
    expect(ApiService.strategy).toBe(mockStrategy);
  });

  it('all getter must return foo', () => {
    expect(ApiService.language).toBe('foo');
    expect(ApiService.country).toBe('foo');
    expect(ApiService.source).toBe('foo');
    expect(ApiService.questionId).toBe('foo');
  });

  it('callApi must call strategy.callApi ', () => {
    // Given
    jest.spyOn(mockStrategy, 'callApi');
    const url = 'http://url.fr';
    const options = { headers: { 'x-make-app-name': 'test' } };
    // When
    ApiService.callApi(url, options);
    // Then
    expect(mockStrategy.callApi).toHaveBeenNthCalledWith(1, url, options);
  });
});
