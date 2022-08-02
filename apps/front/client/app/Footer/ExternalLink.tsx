/* eslint-disable react/jsx-no-useless-fragment */
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import React from 'react';
import i18n from 'i18next';
import {
  FooterItemHTMLLinkStyle,
  FooterItemStyle,
  FooterLinkIconStyle,
} from './style';
import { FooterLinkType } from './localized/Common';

export const FooterExternalLink: React.FC<{ externalLink: FooterLinkType }> = ({
  externalLink,
}) => (
  <FooterItemStyle>
    <FooterItemHTMLLinkStyle
      target="_blank"
      rel="noopener"
      href={externalLink.url}
      onClick={externalLink.onClick}
    >
      {externalLink.label}
      <> </>
      <FooterLinkIconStyle aria-hidden focusable="false" />
      <> </>
      <ScreenReaderItemStyle>
        {i18n.t('common.open_new_window')}
      </ScreenReaderItemStyle>
    </FooterItemHTMLLinkStyle>
  </FooterItemStyle>
);
