/* @flow */

import React, { useState } from 'react';
import {
  TopTooltipStyle,
  BottomTooltipStyle,
  LeftTooltipStyle,
  RightTooltipStyle,
} from '../../elements/TooltipElements';
import { TooltipComponent } from './TooltipComponent';

type Props = {
  /** Content of the button */
  content: any,
  /** Content of the Tooltip */
  children: React.ReactChild | string,
  /** Styled Component Element */
  direction: string,
};

const TooltipType = {
  top: TopTooltipStyle,
  bottom: BottomTooltipStyle,
  left: LeftTooltipStyle,
  right: RightTooltipStyle,
};

export const TooltipContainer: React.FC<Props> = ({
  content,
  children,
  direction = 'top',
}) => {
  /** Boolean when tooltip is displayed */
  const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);

  const showTooltip = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisplayTooltip(true);
  };

  const hideTooltip = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisplayTooltip(false);
  };

  return (
    <TooltipComponent
      type={TooltipType[direction]}
      content={content}
      displayTooltip={displayTooltip}
      showTooltip={showTooltip}
      hideTooltip={hideTooltip}
    >
      {children}
    </TooltipComponent>
  );
};
