const THROTTLE_DEFAULT_TIME = 500;
// light version of lodash.throttle https://www.npmjs.com/package/lodash.throttle
export const throttle = (
  func: any = () => undefined,
  preventDefault = true,
  time = THROTTLE_DEFAULT_TIME,
  context = typeof window !== 'undefined' ? window : {}
): void => {
  let wait = false;
  let timer;
  return (...args) => {
    if (args[0] && args[0].preventDefault && preventDefault) {
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
