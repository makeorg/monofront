import { createInitialState } from '@make.org/store/initialState';
import httpMocks from 'node-mocks-http';
import { reactRender } from '../reactRender';
import { defaultRoute } from './defaultRoute';

jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));

describe('defaultRoute', () => {
  it('must call reactRender', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const initialState = createInitialState();

    await defaultRoute(request, response);
    expect(reactRender).toHaveBeenCalledWith(request, response, initialState);
  });
});
