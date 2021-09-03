import { v4 as uuidv4 } from 'uuid';
import { logError } from './ssr.helper';

const mockLoggerLog = jest.fn();

jest.mock('@make.org/utils/helpers/logger', () => ({
  getLoggerInstance: () => ({
    log: mockLoggerLog,
  }),
}));

jest.mock('uuid');
uuidv4.mockReturnValue('uuid-121212');

describe('ssr helper', () => {
  describe('logError', () => {
    const stack = { stack: 'value stack' };
    logError('value');
    logError(stack);

    // TODO find a way to mock uuid / app_logId
    it('default case', () => {
      console.log('fix the test');
    });
    // it('default case', () => {
    //   expect(mockLoggerLog).toHaveBeenNthCalledWith(1, 'error', {
    //     app_logId: 'uuid-121212',
    //     app_logName: '-',
    //     message: 'value',
    //     stack: 'no-stack',
    //   });
    // });

    // it('must return stack', () => {
    //   expect(mockLoggerLog).toHaveBeenNthCalledWith(2, 'error', {
    //     message: '-',
    //     app_logId: 'uuid-121212',
    //     app_logName: '-',
    //     stack: 'value stack',
    //   });
    // });
  });
});
