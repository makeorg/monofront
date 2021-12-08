import { useState, useEffect } from 'react';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '../helpers/styled';
import { Logger } from '../services/Logger';

export const useMedia = (query: string): boolean => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!window.matchMedia) {
      Logger.logWarning({
        message: 'window.matchMedia is not supported',
        name: 'client-helper',
      });
      return () => {
        isMounted = false;
      };
    }
    const mql = window.matchMedia(query);

    const onChange = () => {
      if (!isMounted) {
        return;
      }
      setValue(!!mql.matches);
    };

    mql.addListener(onChange);

    setValue(mql.matches);
    return () => {
      isMounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return value;
};

export const useDesktop = (): boolean =>
  useMedia(`(min-width: ${intToPx(Breakpoints.Desktop)})`);

export const useTablet = (): boolean =>
  useMedia(`(min-width: ${intToPx(Breakpoints.Tablet)})`);

export const useLargeMobile = (): boolean =>
  useMedia(`(min-width: ${intToPx(Breakpoints.LargeMobile)})`);

export const useMobile = (): boolean =>
  useMedia(
    `only screen and (max-device-width: ${intToPx(Breakpoints.Tablet)})`
  );

export const useScreenWidth = (): number | null => {
  const hasWindowObject = typeof window === 'object';

  const screenWidth = hasWindowObject ? window.screen.width : null;
  const [value, setValue] = useState(screenWidth);

  const resize = () => setValue(window.screen.width);
  if (hasWindowObject) {
    window.addEventListener('resize', resize);
  }

  useEffect(
    () => () => {
      if (hasWindowObject) {
        window.removeEventListener('resize', resize);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return value;
};

export const useScreenMobileContainerWidth = (): number | null => {
  const screenWidth = useScreenWidth();
  const mobileContainerPadding = 20 * 2;

  return screenWidth ? screenWidth - mobileContainerPadding : null;
};

export const useDevicePixelRatio = (): number => {
  if (typeof window === 'object') {
    return window.devicePixelRatio;
  }

  return 1;
};
