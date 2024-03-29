import httpMocks from 'node-mocks-http';
import fs from 'fs';
import NodeCache from 'node-cache';
import { APP_SERVER_DIR } from '../paths';
import { questionResults } from './question';

jest.mock('fs');
jest.mock('@make.org/assets/env', () => ({
  env: {
    frontUrl: jest.fn(),
    port: jest.fn(),
    contentApiUrlServerSide: jest.fn(),
  },
}));
jest.mock('node-cache');

const mockedFs = fs as jest.Mocked<any>;
const mockNodeCache = NodeCache as jest.Mocked<any>;
const mockCache = mockNodeCache.mock.instances[1];

describe('QuestionResults Api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockNodeCache.mockClear();
  });

  describe('response Header in question results api', () => {
    it('set Header for Access Allow Origin and content Type', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'setHeader');
      mockCache.get.mockReturnValue('fooCache');

      questionResults(request, response);
      expect(response.getHeader('Access-Control-Allow-Origin')).toEqual('');
      expect(response.getHeader('Content-Type')).toEqual('application/json');
    });
  });

  describe('fetch response from cache', () => {
    it('return response from memory cache', () => {
      const request = httpMocks.createRequest({
        params: { questionId: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'send');
      jest.spyOn(mockCache, 'get');

      mockCache.get.mockReturnValue('fooCache');
      questionResults(request, response);
      expect(response.send).toHaveBeenCalledWith('fooCache');
      expect(mockCache.get).toHaveBeenCalledWith(`RESULT:foo-bar`);
    });

    it.skip('return response from file and put the content in cache', () => {
      const request = httpMocks.createRequest({
        params: { questionId: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      const fileContent = 'baz';
      jest.spyOn(response, 'send');
      jest.spyOn(mockCache, 'get');
      jest.spyOn(mockCache, 'set');

      mockCache.get.mockReturnValue(undefined);
      mockedFs.readFileSync.mockReturnValue(fileContent);

      questionResults(request, response);
      expect(response.send).toHaveBeenCalledWith(fileContent);
      expect(mockCache.get).toHaveBeenCalledWith(`RESULT:foo-bar`);
      expect(mockCache.set).toHaveBeenCalledWith(`RESULT:foo-bar`, fileContent);
    });

    it.skip('return not found when params file does not exist', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      jest.spyOn(response, 'send');
      jest.spyOn(mockCache, 'get');
      jest.spyOn(mockCache, 'set');

      mockCache.get.mockReturnValue(undefined);
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('bad');
      });

      questionResults(request, response);

      expect(mockCache.get).toHaveBeenCalledWith(
        `${APP_SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
      expect(mockCache.set).not.toHaveBeenCalled();
      expect(response.send).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(404);
    });
  });
});
