import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const OrganisationProfileSkipLinks: React.FC = () => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#organisation_nav">
        {i18n.t('skip_links.secondary_nav')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
