import React from 'react';
import { TooltipStyle } from '../../elements/TooltipElements';

type Props = {
  /** Content of the button */
  content: React.Component,
  /** Content of the Tooltip element */
  children: React.Component | string,
  /** Styled Component Element used as button */
  type: React.Component,
  /** Method to show tooltip */
  showTooltip: (event: SyntheticInputEvent<HTMLButtonElement>) => void,
  /** Method to hide tooltip */
  hideTooltip: (event: SyntheticInputEvent<HTMLButtonElement>) => void,
  /** Boolean toggled when tooltip is shown / hidden */
  displayTooltip: boolean,
};

export const TooltipComponent: React.FC<Props> = (props) => {
  const { content, children, type, displayTooltip, showTooltip, hideTooltip } = props;

  return (
    <>
      <TooltipStyle as={type} aria-hidden={!displayTooltip} role="tooltip">
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
