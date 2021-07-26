import httpMocks from 'node-mocks-http';
import { headersResponseMiddleware } from './headers';

describe('Headers response middleware', () => {
  describe('headersResponseMiddleware function', () => {
    it('set Header for Server Response, should returns "Server : Express"', () => {
      const request = httpMocks.createRequest({
        params: { countryLanguage: 'FR' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'setHeader');
      headersResponseMiddleware(request, response, () => {});
      expect(response.setHeader).toHaveBeenCalledWith('Server', 'Express');
    });
  });
});
