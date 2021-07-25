import { Logger } from '@make.org/utils/services/Logger';
import {
  intToPx,
  matchDesktopDevice,
  matchMobileDevice,
} from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  setDesktopDevice,
  setMobileDevice,
} from '@make.org/store/actions/appConfig';
import { ReducerAction } from '@make.org/types';

export const updateDeviceInState = (
  deviceInState: string
): undefined | ReducerAction => {
  if (!window.matchMedia) {
    Logger.logWarning({
      message: 'window.matchMedia is not supported',
      name: 'client-helper',
    });
    return undefined;
  }

  let actionToDispatch;
  const isMobileInState = matchMobileDevice(deviceInState);
  const isDesktopInState = matchDesktopDevice(deviceInState);
  const mqlDesktopViewport = window.matchMedia(
    `(min-width: ${intToPx(Breakpoints.Desktop)})`
  );

  // Viewport prevails on device;
  // Viewport has a desktop width but deviceInState is mobile
  if (mqlDesktopViewport.matches && isMobileInState) {
    actionToDispatch = setDesktopDevice();
  }

  // Viewport doesn't have a desktop width but deviceInState is desktop
  if (!mqlDesktopViewport.matches && isDesktopInState) {
    actionToDispatch = setMobileDevice();
  }

  return actionToDispatch;
};
