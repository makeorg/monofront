import { apiErrorDataLogNormalizer } from './apiErrorDataLogNormalizer';
import { ApiServiceError } from '../ApiService/ApiServiceError';

describe('should normalize api error', () => {
  it('return normalized data from an ApiServiceError', () => {
    try {
      throw new ApiServiceError(
        'error message',
        403,
        {},
        'http://url',
        'POST',
        'EEE-23',
        true,
        'BBB-126'
      );
    } catch (e) {
      const result = apiErrorDataLogNormalizer(e);
      expect(result?.app_normalizer).toEqual('apiErrorNormalizer');
      expect(result?.app_url).toEqual('http://url');
      expect(result?.app_method).toEqual('POST');
      expect(result?.app_logId).toEqual('EEE-23');
      expect(result?.app_status).toEqual(403);
      expect(result?.app_requestId).toEqual('BBB-126');
    }
  });
});
