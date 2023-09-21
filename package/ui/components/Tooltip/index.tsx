import React, { SyntheticEvent, useState } from 'react';
import { StyledComponent } from 'styled-components';
import {
  BottomTooltipStyle,
  LeftTooltipStyle,
  RightTooltipStyle,
  TooltipStyle,
  TopTooltipStyle,
} from '../../elements/TooltipElements';

type Props = {
  /** Content of the button */
  content?: string | JSX.Element;
  /** Content of the Tooltip */
  children: JSX.Element;
  /** Styled Component Element */
  direction?: string;
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

  const showTooltip = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDisplayTooltip(true);
  };

  const hideTooltip = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDisplayTooltip(false);
  };

  return (
    <>
      <TooltipStyle
        as={TooltipType[direction]}
        aria-hidden={!displayTooltip}
        role="tooltip"
      >
        {content}
      </TooltipStyle>
      <div
        onMouseEnter={event => showTooltip(event)}
        onMouseLeave={event => hideTooltip(event)}
        onFocus={event => showTooltip(event)}
        onBlur={event => hideTooltip(event)}
      >
        {children}
      </div>
    </>
  );
};
