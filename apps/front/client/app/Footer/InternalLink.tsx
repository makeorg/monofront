import React from 'react';
import { FooterItemLinkStyle, FooterItemStyle } from './style';
import { FooterLinkType } from './localized/Common';

export const FooterInternalLink: React.FC<{ internalLink: FooterLinkType }> = ({
  internalLink,
}) => (
  <FooterItemStyle>
    <FooterItemLinkStyle onClick={internalLink.onClick} to={internalLink.url}>
      {internalLink.label}
    </FooterItemLinkStyle>
  </FooterItemStyle>
);
