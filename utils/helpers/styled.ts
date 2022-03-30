import { DESKTOP_DEVICE, MOBILE_DEVICE } from '../constants/config';

export const pxToPercent = (
  childValue: number,
  parentValue: number
): string => {
  const percentValue = (childValue * 100) / parentValue;
  return `${percentValue}%`;
};

export const pxToRem = (value: string | number, base = 16): string => {
  const px = typeof value === 'number' ? value : parseInt(value, 10);
  const rem = parseFloat((px / base).toPrecision(4));

  return `${rem}rem`;
};

export const intToPx = (value: number): string => `${value}px`;

export const getBarHeight = (value: number, maxHeight: number): string => {
  const barHeight = (value * maxHeight) / 100;
  return `${barHeight}px`;
};

export const scrollToTop = (): void | null => {
  const app = document.getElementById('app');
  if (!app) {
    return null;
  }
  return window.scrollTo(0, app.getBoundingClientRect().top);
};

// eslint-disable-next-line consistent-return
export const scrollToElementId = (elementId: string): void | null => {
  const sleep = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));
  const element = document.getElementById(elementId);
  if (!element) {
    return null;
  }
  sleep(10).then(() => element.scrollIntoView());
};

export const getFullWidthDividedByItems = (count: number): string =>
  `${100 / count}%`;

export const lockBody = (): void => {
  const body = document.querySelector('body');
  if (!body) {
    return undefined;
  }
  return body.classList.add('locked');
};

export const unlockBody = (): void => {
  const body = document.querySelector('body');
  if (!body) {
    return undefined;
  }
  return body.classList.remove('locked');
};

export const matchDesktopDevice = (device: string): boolean => {
  if (device === DESKTOP_DEVICE) {
    return true;
  }
  return false;
};

export const matchMobileDevice = (device: string): boolean => {
  if (device === MOBILE_DEVICE) {
    return true;
  }
  return false;
};
