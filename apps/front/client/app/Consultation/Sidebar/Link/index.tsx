// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { NewWindowIconStyle } from 'Client/ui/Elements/LinkElements';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { NewWindowLinkStyle } from './style';

type Props = {
  linkUrl: string,
  linkText: string,
  tracking: () => void,
};

export const SidebarNewWindowLink = ({
  linkUrl,
  linkText,
  tracking,
}: Props) => (
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
