import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const ProposalSkipLinks: React.FC = () => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#proposal_card">
        {i18n.t('skip_links.proposal_card')}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#sharing_proposal">
        {i18n.t('skip_links.sharing')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
