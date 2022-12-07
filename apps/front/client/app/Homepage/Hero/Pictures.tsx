import React, { FC } from 'react';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useTablet } from '@make.org/utils/hooks/useMedia';
import { useAppContext } from '@make.org/store';
import { HeroPicturesStyle } from './style';

export const HeroPictures: FC = () => {
  const { state } = useAppContext();
  const { device, country } = state.appConfig;
  const isDesktopInState = matchDesktopDevice(device);
  const isTabletViewport = useTablet();
  const imageCommonPath = 'https://assets.make.org/assets/home';

  let HeroDesktop = `${imageCommonPath}/hero-desktop-170720.png`;
  let HeroSmallDevices = `${imageCommonPath}/hero-tablettes-170720.png`;

  if (country === 'DE') {
    HeroDesktop = `${imageCommonPath}/homepage_desktop_de.png`;
    HeroSmallDevices = `${imageCommonPath}/homepage_mobile_de.png`;
  }

  if (country === 'UA') {
    HeroDesktop = `${imageCommonPath}/hero-desktop-ua.png`;
    HeroSmallDevices = `${imageCommonPath}/hero-phone-ua.png`;
  }

  if (country === 'CZ') {
    HeroDesktop = `${imageCommonPath}/hero-desktop-cz.png`;
    HeroSmallDevices = `${imageCommonPath}/hero-phone-cz.png`;
  }

  let HeroPictureWidth = 335;
  let HeroPictureHeight = 202;

  if (isDesktopInState) {
    HeroPictureWidth = 540;
    HeroPictureHeight = 487;
  }

  if (isTabletViewport && !isDesktopInState) {
    HeroPictureWidth = 728;
    HeroPictureHeight = 465;
  }

  return (
    <HeroPicturesStyle
      width={HeroPictureWidth}
      height={HeroPictureHeight}
      src={isDesktopInState ? HeroDesktop : HeroSmallDevices}
      alt=""
      crop
    />
  );
};
