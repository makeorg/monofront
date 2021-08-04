import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

import { NAVIGATION, PANEL, IDS } from '@make.org/types/enums';

export const MainSkipLinks: React.FC = () => (
  <UnstyledListStyle
    id={IDS.MAIN_SKIPLINKS}
    className={`${NAVIGATION.NAVIGATION_ARIA_CLASS} ${PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS}`}
  >
    <li>
      <SkipLink as="a" href={`#${IDS.MAIN_CONTENT}`}>
        {i18n.t('skip_links.main_content')}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href={`#${IDS.MAIN_FOOTER}`}>
        {i18n.t('skip_links.main_footer')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
