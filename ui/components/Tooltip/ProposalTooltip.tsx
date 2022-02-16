import React, { useState } from 'react';
import i18n from 'i18next';
import {
  ProposalTooltipCloseButtonStyle,
  ProposalTooltipCloseIconStyle,
  ProposalTooltipLabelStyle,
  ProposalTooltipInfoIconStyle,
  ProposalTooltipVerticalSeparatorStyle,
  ProposalTooltipDescriptionStyle,
  ProposalTriangleUpStyle,
  ProposalTooltipWrapperStyle,
} from '../../elements/TooltipElements';

export const ProposalTooltip: React.FC = () => {
  const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayTooltip(true);
  };

  const closeTooltip = () => {
    setDisplayTooltip(false);
  };

  const DisplayTooltip: React.FC = () => (
    <>
      <ProposalTriangleUpStyle />
      <ProposalTooltipDescriptionStyle>
        {i18n.t('proposal_submit.success.tooltip_description')}
        <ProposalTooltipVerticalSeparatorStyle />
        <ProposalTooltipCloseButtonStyle onClick={closeTooltip}>
          <ProposalTooltipCloseIconStyle aria-hidden focusable="false" />
        </ProposalTooltipCloseButtonStyle>
      </ProposalTooltipDescriptionStyle>
    </>
  );

  return (
    <ProposalTooltipWrapperStyle>
      <ProposalTooltipLabelStyle role="tooltip" onClick={handleClick}>
        {i18n.t('proposal_submit.success.tooltip_title')}
        <ProposalTooltipInfoIconStyle aria-hidden focusable="false" />
      </ProposalTooltipLabelStyle>
      {displayTooltip && <DisplayTooltip />}
    </ProposalTooltipWrapperStyle>
  );
};
