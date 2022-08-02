/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NewWindowLinkStyle, NewWindowIconStyle } from './style';

type Props = {
  linkUrl: string;
  linkText: string;
  tracking: () => void;
};

export const NewWindowLink: FC<Props> = ({ linkUrl, linkText, tracking }) => (
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
