// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { NewWindowLinkStyle, NewWindowIconStyle } from './style';

type Props = {
  linkUrl: string,
  linkText: string,
  tracking: () => void,
};

export const NewWindowLink = ({ linkUrl, linkText, tracking }: Props) => (
  <NewWindowLinkStyle
    href={linkUrl}
    target="_blank"
    rel="noopener"
    onClick={tracking}
  >
    {linkText}
    <> </>
    <NewWindowIconStyle aria-hidden focusable="false" />
    <ScreenReaderItemStyle>
      {i18n.t('common.open_new_window')}
    </ScreenReaderItemStyle>
  </NewWindowLinkStyle>
);
