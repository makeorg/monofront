import React, { FC } from 'react';
import i18n from 'i18next';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { trackClickBreadcrumbs } from '@make.org/utils/services/Tracking';
import {
  BreadcrumbsWrapperStyle,
  BreadcrumbsListStyle,
  BreadcrumbsLinkStyle,
  ArrowIconStyle,
  HomeIconStyle,
} from './style';

export type BreadcrumbsPagesType = {
  name: string;
  link: string;
};

type Props = {
  /** Array with parentPages object (name: string, link: string) */
  parentPages?: BreadcrumbsPagesType[];
  /** The currentPage object (name: string, link: string) */
  currentPage: BreadcrumbsPagesType;
};

export const Breadcrumbs: FC<Props> = ({ parentPages, currentPage }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const initialIndex = 1;
  const indexOffset = initialIndex + 1;

  return (
    <nav aria-label={i18n.t('common.breadcrumbs')}>
      <BreadcrumbsWrapperStyle as="ol">
        <BreadcrumbsListStyle>
          <HomeIconStyle aria-hidden focusable="false" />
          <BreadcrumbsLinkStyle
            to={getHomeLink(country)}
            onClick={() => trackClickBreadcrumbs(initialIndex)}
          >
            <>{i18n.t('homepage.title')}</>
          </BreadcrumbsLinkStyle>
          <ArrowIconStyle aria-hidden focusable="false" />
        </BreadcrumbsListStyle>
        {parentPages &&
          parentPages.map((parentPage, index) => (
            <BreadcrumbsListStyle key={parentPage.link}>
              <BreadcrumbsLinkStyle
                to={parentPage.link}
                onClick={() => trackClickBreadcrumbs(index + indexOffset)}
              >
                {parentPage.name}
              </BreadcrumbsLinkStyle>
              <ArrowIconStyle aria-hidden focusable="false" />
            </BreadcrumbsListStyle>
          ))}
        <BreadcrumbsListStyle className="selected">
          <BreadcrumbsLinkStyle aria-current="page" to={currentPage.link}>
            {currentPage.name}
          </BreadcrumbsLinkStyle>
        </BreadcrumbsListStyle>
      </BreadcrumbsWrapperStyle>
    </nav>
  );
};
