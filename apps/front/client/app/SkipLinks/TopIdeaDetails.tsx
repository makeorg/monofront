import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

type Props = {
  hasComments: boolean;
};

export const TopIdeaDetailsSkipLinks: React.FC<Props> = ({ hasComments }) => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#sidebar_content">
        {i18n.t('skip_links.sidebar_content')}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#main">
        {i18n.t('skip_links.dynamic_section', {
          name: i18n.t('idea_details.current_page'),
        })}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#proposals_list">
        {i18n.t('skip_links.dynamic_section', {
          name: i18n.t('idea_details.proposals'),
        })}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
