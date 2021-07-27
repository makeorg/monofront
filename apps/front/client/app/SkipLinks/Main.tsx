// @flow
import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  NAVIGATION_ARIA_CLASS,
  PANEL_ARIA_NEGATIVE_TAB_CLASS,
} from '@make.org/utils/constants/a11y';
import {
  MAIN_SKIPLINKS,
  MAIN_FOOTER,
  MAIN_CONTENT,
} from '@make.org/utils/constants/ids';

export const MainSkipLinks: React.FC = () => (
  <UnstyledListStyle
    id={MAIN_SKIPLINKS}
    className={`${NAVIGATION_ARIA_CLASS} ${PANEL_ARIA_NEGATIVE_TAB_CLASS}`}
  >
    <li>
      <SkipLink as="a" href={`#${MAIN_CONTENT}`}>
        {i18n.t('skip_links.main_content')}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href={`#${MAIN_FOOTER}`}>
        {i18n.t('skip_links.main_footer')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
