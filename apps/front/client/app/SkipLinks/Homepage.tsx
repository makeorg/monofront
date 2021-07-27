import React from 'react';
import i18n from 'i18next';
import { SkipLink } from '@make.org/ui/elements/MainElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const HomepageSkipLinks: React.FC = () => (
  <UnstyledListStyle>
    <li>
      <SkipLink as="a" href="#highlights">
        {i18n.t('skip_links.dynamic_section', {
          name: i18n.t('homepage.highlights.title'),
        })}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#current_questions">
        {i18n.t('skip_links.dynamic_section', {
          name: i18n.t('browse.title'),
        })}
      </SkipLink>
    </li>
    <li>
      <SkipLink as="a" href="#featured_questions">
        {i18n.t('skip_links.dynamic_section', {
          name: i18n.t('homepage.featured_questions.title'),
        })}
      </SkipLink>
    </li>
  </UnstyledListStyle>
);
