import { ChangeEvent, FormEvent } from 'react';

const THROTTLE_DEFAULT_TIME = 500;
// light version of lodash.throttle https://www.npmjs.com/package/lodash.throttle
export const throttle = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: any = () => undefined,
  preventDefault = true,
  time: number = THROTTLE_DEFAULT_TIME,
  context = typeof window !== 'undefined' ? window : {}
): ((...args: ChangeEvent[] | FormEvent[]) => void) => {
  let wait = false;
  let timer: NodeJS.Timeout;
  return (...args: ChangeEvent[] | FormEvent[]): void => {
    if (args[0] && !!args[0].preventDefault && preventDefault) {
      args[0].preventDefault();
    }
    const later = () => {
      func.apply(context, args);
    };
    if (!wait) {
      later();
      wait = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        wait = false;
      }, time);
    }
  };
};
