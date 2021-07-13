import React, { Component, SyntheticEvent, useState } from 'react';
import { StyledComponent } from 'styled-components';
import { BottomTooltipStyle, LeftTooltipStyle, RightTooltipStyle, TooltipStyle, TopTooltipStyle } from '../../elements/TooltipElements';

type Props = {
  /** Content of the button */
  content: Component | string,
  /** Content of the Tooltip */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any,
  /** Styled Component Element */
  direction?: string,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipType: Record<string, StyledComponent<'div', any>> = {
  top: TopTooltipStyle,
  bottom: BottomTooltipStyle,
  left: LeftTooltipStyle,
  right: RightTooltipStyle,
};

export const Tooltip: React.FC<Props> = ({
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
    <>
      <TooltipStyle as={TooltipType[direction]} aria-hidden={!displayTooltip} role="tooltip">
        {content}
      </TooltipStyle>
      <div
        onMouseEnter={() => showTooltip}
        onMouseLeave={() => hideTooltip}
        onFocus={() => showTooltip}
        onBlur={() => hideTooltip}
      >
        {children}
      </div>
    </>
  );
};
