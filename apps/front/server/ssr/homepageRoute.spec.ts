import httpMocks from 'node-mocks-http';
import { createInitialState } from '@make.org/store/initialState';
import { ViewsService } from '../service/ViewsService';
import { homepageRoute } from './homepageRoute';
import { reactRender } from '../reactRender';

jest.mock('@make.org/api/ViewsApiService');
jest.mock('../service/ViewsService');
jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));

const mockedViewsService = ViewsService as jest.Mocked<any>;

const country = 'FR';
const language = 'fr';
const initialState = createInitialState();
const request = httpMocks.createRequest({
  params: {
    country,
    language,
  },
});
const response = httpMocks.createResponse();

describe('Homepage route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The route', () => {
    it('construct route initial state and render', async () => {
      mockedViewsService.getHome.mockReturnValue({
        test: 'test',
      });
      mockedViewsService.clearCache();

      await homepageRoute(request, response);
      expect(reactRender).toHaveBeenCalledWith(request, response, {
        ...initialState,
        views: { homepage: { test: 'test', country, language } },
      });
    });
  });
});
