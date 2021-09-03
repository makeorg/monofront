import httpMocks from 'node-mocks-http';
import fs from 'fs';
import cache from 'memory-cache';
import { APP_SERVER_DIR } from '../paths';
import { questionResults } from './question';

jest.mock('memory-cache');
jest.mock('fs');
jest.mock('@make.org/assets/env', () => ({
  env: {
    frontUrl: jest.fn(),
  },
}));

const mockedCache = cache as jest.Mocked<any>;
const mockedFs = fs as jest.Mocked<any>;

describe('QuestionResults Api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('resonse Header in quesion results api', () => {
    it('set Header for Access Allow Origin and content Type', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'setHeader');
      mockedCache.get.mockReturnValue('fooCache');

      questionResults(request, response);
      expect(response.getHeader('Access-Control-Allow-Origin')).toEqual('');
      expect(response.getHeader('Content-Type')).toEqual('application/json');
    });
  });

  describe('question Slug params validtion', () => {
    it('question Slug is not a valid slug', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo$<ttt' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      questionResults(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
    });

    it('question Slug is a valid slug', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      questionResults(request, response);
      expect(response.status).not.toHaveBeenCalledWith(400);
    });
  });

  describe('fetch response from cache', () => {
    it('return response from memory cache', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'send');
      jest.spyOn(cache, 'get');

      mockedCache.get.mockReturnValue('fooCache');
      questionResults(request, response);
      expect(response.send).toHaveBeenCalledWith('fooCache');
      expect(cache.get).toHaveBeenCalledWith(
        `${APP_SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
    });

    it('return response from file and put the content in cache', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      const fileContent = 'baz';
      jest.spyOn(response, 'send');
      jest.spyOn(cache, 'get');
      jest.spyOn(cache, 'put');

      mockedCache.get.mockReturnValue(undefined);
      mockedFs.readFileSync.mockReturnValue(fileContent);

      questionResults(request, response);
      expect(response.send).toHaveBeenCalledWith(fileContent);
      expect(cache.get).toHaveBeenCalledWith(
        `${APP_SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
      expect(cache.put).toHaveBeenCalledWith(
        `${APP_SERVER_DIR}/staticData/questionResults/foo-bar.json`,
        fileContent
      );
    });

    it('return not found when params file does not exist', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      jest.spyOn(response, 'send');
      jest.spyOn(cache, 'get');
      jest.spyOn(cache, 'put');

      mockedCache.get.mockReturnValue(undefined);
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('bad');
      });

      questionResults(request, response);

      expect(cache.get).toHaveBeenCalledWith(
        `${APP_SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
      expect(cache.put).not.toHaveBeenCalled();
      expect(response.send).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(404);
    });
  });
});
