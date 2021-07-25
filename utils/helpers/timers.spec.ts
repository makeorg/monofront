import { debounce } from './timers';

/**
 * Mocking timer
 * See https://jestjs.io/docs/en/timer-mocks.html
 */
jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;
  let debouncedFunc: Function;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  test('execute just once', () => {
    debouncedFunc();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Function should be called only once
    expect(func).toBeCalledTimes(1);
  });
});
