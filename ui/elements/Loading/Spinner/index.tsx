import * as React from 'react';
import { i18n } from '@make.org/utils/i18n';
import {
  SpinnerContainerStyle,
  SpinnerWrapperStyle,
  SpinnerFirstRingStyle,
  SpinnerSecondRingStyle,
  SpinnerThirdRingStyle,
  SpinnerFourthRingStyle,
} from './Styled';

export const Spinner: React.FC = () => (
  <SpinnerContainerStyle as="aside" aria-label={i18n.t('common.loading')}>
    <SpinnerWrapperStyle>
      <SpinnerFirstRingStyle aria-hidden />
      <SpinnerSecondRingStyle aria-hidden />
      <SpinnerThirdRingStyle aria-hidden />
      <SpinnerFourthRingStyle aria-hidden />
    </SpinnerWrapperStyle>
  </SpinnerContainerStyle>
);
