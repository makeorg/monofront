import { Elements } from '@make.org/assets/vars/Elements';
import { DefaultPadding } from '@make.org/assets/vars/Breakpoints';

export const CALC_RECOVERY_HEIGHT_MOBILE: number =
  Elements.HeaderHeightMobile +
  Elements.FooterHeightMobile +
  DefaultPadding.Mobile;

export const CALC_RECOVERY_HEIGHT_DESKTOP: number =
  Elements.HeaderHeightDesktop +
  Elements.FooterHeightDesktop +
  DefaultPadding.Desktop;

export const PIE_CHART = 'pie';
export const HISTOGRAM_CHART = 'histogram';
