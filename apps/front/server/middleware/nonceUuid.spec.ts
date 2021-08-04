import httpMocks from 'node-mocks-http';
import { v4 as uuidv4 } from 'uuid';
import { nonceUuidMiddleware } from './nonceUuid';

jest.mock('uuid');
const mockedUuid = uuidv4 as jest.Mocked<any>;

describe('Nonce Uuid middelware', () => {
  it('generate nonce id and add it to responce', () => {
    const response = httpMocks.createResponse();
    mockedUuid.mockReturnValue('1234');

    nonceUuidMiddleware(response, () => undefined);

    expect(response.locals.nonce).toEqual('1234');
  });
});
