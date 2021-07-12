import React from 'react';
import { TooltipStyle } from '../../elements/TooltipElements';

type Props = {
  /** Content of the button */
  content: React.Component,
  /** Content of the Tooltip element */
  children: React.Component | string,
  /** Styled Component Element used as button */
  /** Method to show tooltip */
  showTooltip: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => void,
  /** Method to hide tooltip */
  hideTooltip: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => void,
  /** Boolean toggled when tooltip is shown / hidden */
  displayTooltip: boolean,
};

export const TooltipComponent: React.FC<Props> = (props) => {
  const { content, children, displayTooltip, showTooltip, hideTooltip } = props;

  return (
    <>
      <TooltipStyle aria-hidden={!displayTooltip} role="tooltip">
        {content}
      </TooltipStyle>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
    </>
  );
};
