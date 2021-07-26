import React, { FC } from 'react';
import i18n from 'i18next';
import {
  BreadcrumbsListItemStyleDeprecated,
  BreadcrumbsListStyleDeprecated,
  SeparatorIconStyleDeprecated,
  BreadcrumbsLinkStyleDeprecated,
} from './style';

export type BreadcrumbsPagesType = {
  name: string;
  link: string;
};

type Props = {
  /** Array with parentPages object (name: string, link: string) */
  parentPages: BreadcrumbsPagesType[];
  /** Name of the current page */
  currentPage: BreadcrumbsPagesType;
};

export const Breadcrumbs: FC<Props> = ({ parentPages, currentPage }) => (
  <nav aria-label={i18n.t('common.breadcrumbs')}>
    <BreadcrumbsListStyleDeprecated as="ol">
      {parentPages.map(parentPage => (
        <BreadcrumbsListItemStyleDeprecated key={parentPage.link}>
          <BreadcrumbsLinkStyleDeprecated to={parentPage.link}>
            {parentPage.name}
          </BreadcrumbsLinkStyleDeprecated>
          <SeparatorIconStyleDeprecated aria-hidden focusable="false" />
        </BreadcrumbsListItemStyleDeprecated>
      ))}
      <BreadcrumbsListItemStyleDeprecated className="selected">
        <BreadcrumbsLinkStyleDeprecated
          aria-current="page"
          to={currentPage.link}
        >
          {currentPage.name}
        </BreadcrumbsLinkStyleDeprecated>
      </BreadcrumbsListItemStyleDeprecated>
    </BreadcrumbsListStyleDeprecated>
  </nav>
);
