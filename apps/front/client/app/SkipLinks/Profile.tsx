import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const UserProfileSkipLinks: React.FC = () => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#sidebar_content">
        {i18n.t('skip_links.sidebar_content')}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#profile_nav">
        {i18n.t('skip_links.secondary_nav')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
