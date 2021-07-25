import httpMocks from 'node-mocks-http';
import { questionResults, ALLOWED_URL } from './question';

const fs = require('fs');
const cache = require('memory-cache');
const { SERVER_DIR } = require('../paths');

jest.mock('memory-cache');
jest.mock('fs');

describe('Question Api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

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
      cache.get.mockReturnValueOnce('fooCache');

      questionResults(request, response, () => {});
      expect(response.setHeader.mock.calls).toEqual([
        ['Access-Control-Allow-Origin', ALLOWED_URL],
        ['Content-Type', 'application/json'],
      ]);
    });
  });

  describe('question Slug params validtion', () => {
    it('question Slug is not a valid slug', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo$<ttt' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      questionResults(request, response, () => {});
      expect(response.status).toHaveBeenCalledWith(400);
    });

    it('question Slug is a valid slug', () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'status');
      questionResults(request, response, () => {});
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

      cache.get.mockReturnValueOnce('fooCache');
      questionResults(request, response, () => {});
      expect(response.send).toHaveBeenCalledWith('fooCache');
      expect(cache.get).toHaveBeenCalledWith(
        `${SERVER_DIR}/staticData/questionResults/foo-bar.json`
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

      cache.get.mockReturnValueOnce(undefined);
      fs.readFileSync.mockReturnValueOnce(fileContent);

      questionResults(request, response, () => {});
      expect(response.send).toHaveBeenCalledWith(fileContent);
      expect(cache.get).toHaveBeenCalledWith(
        `${SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
      expect(cache.put).toHaveBeenCalledWith(
        `${SERVER_DIR}/staticData/questionResults/foo-bar.json`,
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

      cache.get.mockReturnValueOnce(undefined);
      fs.readFileSync.mockImplementation(() => {
        throw new Error('bad');
      });

      questionResults(request, response, () => {});

      expect(cache.get).toHaveBeenCalledWith(
        `${SERVER_DIR}/staticData/questionResults/foo-bar.json`
      );
      expect(cache.put).not.toHaveBeenCalled();
      expect(response.send).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(404);
    });
  });
});
