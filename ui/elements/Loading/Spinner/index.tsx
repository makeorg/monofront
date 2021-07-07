import * as React from 'react';
import { i18n } from '@make.org/util/i18n';
import {
  SpinnerContainerStyle,
  SpinnerWrapperStyle,
  SpinnerFirstRingStyle,
  SpinnerSecondRingStyle,
  SpinnerThirdRingStyle,
  SpinnerFourthRingStyle,
} from './Styled';

export const Spinner = () => (
  <SpinnerContainerStyle as="aside" aria-label={i18n.t('common.loading')}>
    <SpinnerWrapperStyle>
      <SpinnerFirstRingStyle aria-hidden />
      <SpinnerSecondRingStyle aria-hidden />
      <SpinnerThirdRingStyle aria-hidden />
      <SpinnerFourthRingStyle aria-hidden />
    </SpinnerWrapperStyle>
  </SpinnerContainerStyle>
);
