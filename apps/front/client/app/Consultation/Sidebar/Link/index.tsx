import React, { FC } from 'react';
import i18n from 'i18next';
import { NewWindowIconStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NewWindowLinkStyle } from './style';

type Props = {
  linkUrl: string;
  linkText: string;
  tracking: () => void;
};

export const SidebarNewWindowLink: FC<Props> = ({
  linkUrl,
  linkText,
  tracking,
}) => (
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
