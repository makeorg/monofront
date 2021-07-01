import { DESKTOP_DEVICE, MOBILE_DEVICE } from '../constants/config';

export const pxToRem = (value: string | number, base:number | string = 16): string => {
  const px = typeof value === 'string' ? parseInt(value, 10) : value;
  const parsedBase = typeof base === 'string' ? parseInt(base, 10) : base;
  const rem = parseFloat((px / parsedBase).toPrecision(4));
  return `${rem}rem`;
};

export const pxToPercent = (childValue: number, parentValue: number): string => {
  const percentValue = (childValue * 100) / parentValue;
  return `${percentValue}%`;
};

export const intToPx = (value: number): string => `${value}px`;

export const getBarHeight = (value: number): string => {
  const barHeight = (value * 30) / 100;
  return `${barHeight}px`;
};

export const scrollToTop = (): void => {
  const app = document.getElementById('app');
  if (!app) {
    return null;
  }
  return window.scrollTo(0, app.getBoundingClientRect().top);
};

export const scrollToElementId = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    return null;
  }
  return element.scrollIntoView();
};

export const getFullWidthDividedByItems = (count: number): string => `${100 / count}%`;

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

export const getSixteenPerNineRatioWidth = (height: number): number => (height * 16) / 9;

export const getSixteenPerNineRatioHeight = (width: number): number => (width * 9) / 16;

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
