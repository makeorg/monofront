import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import React from 'react';
import i18n from 'i18next';
import { FooterLinkIconStyle } from './style';

export const FooterExternalLink: React.FC = () => (
  <>
    <FooterLinkIconStyle aria-hidden focusable="false" />
    <> </>
    <ScreenReaderItemStyle>
      {i18n.t('common.open_new_window')}
    </ScreenReaderItemStyle>
  </>
);
