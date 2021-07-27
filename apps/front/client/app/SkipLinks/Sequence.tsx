// @flow
import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const SequenceSkipLinks: React.FC = () => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#sequence">
        {i18n.t('skip_links.proposal_list')}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
