import React, { FC } from 'react';
import { LoadingWrapperStyle, DotStyle } from './style';

type Props = {
  isWidget?: boolean;
};

export const LoadingDots: FC<Props> = ({ isWidget }) => (
  <LoadingWrapperStyle aria-hidden>
    <DotStyle className={isWidget ? 'widget' : ''} delay={0} duration={1}>
      &bull;
    </DotStyle>
    <DotStyle className={isWidget ? 'widget' : ''} delay={0.2} duration={1}>
      &bull;
    </DotStyle>
    <DotStyle className={isWidget ? 'widget' : ''} delay={0.45} duration={1}>
      &bull;
    </DotStyle>
  </LoadingWrapperStyle>
);
