import React, { FC } from 'react';
import i18n from 'i18next';
import { useLocation, useParams } from 'react-router';
import {
  getBrowseConsultationsLink,
  getBrowseResultsLink,
} from '@make.org/utils/helpers/url';
import { isBrowseConsultationsPage } from '@make.org/utils/routes';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import {
  BreadcrumbsPagesType,
  Breadcrumbs,
} from '../../Breadcrumbs/Breadcrumbs';
import {
  InnerPagesNavigation,
  PageNavigationType,
} from '../../Navigation/Pages';
import {
  BrowseHeaderStyle,
  BrowseHeaderInnerStyle,
  BrowseHeaderTitleStyle,
} from './style';

export const BrowseConsultationsHeader: FC = () => {
  const location = useLocation();
  const { state } = useAppContext();
  const { country, pageId } = useParams<{ country: string; pageId?: string }>();
  const { device } = state.appConfig;
  const consultationsPage = isBrowseConsultationsPage(location.pathname);
  const isDesktop = matchDesktopDevice(device);

  const currentPage: BreadcrumbsPagesType = {
    name: consultationsPage
      ? i18n.t('browse.nav_consultations_desktop')
      : i18n.t('browse.nav_results_desktop'),
    link: location.pathname,
  };

  const BrowseNavigation: PageNavigationType[] = [
    {
      link: getBrowseConsultationsLink(country),
      label: isDesktop
        ? i18n.t('browse.nav_consultations_desktop')
        : i18n.t('browse.nav_consultations_mobile'),
      routeToMatch: getBrowseConsultationsLink(country, Number(pageId)),
    },
    {
      link: getBrowseResultsLink(country),
      label: isDesktop
        ? i18n.t('browse.nav_results_desktop')
        : i18n.t('browse.nav_results_mobile'),
      routeToMatch: getBrowseResultsLink(country, Number(pageId)),
    },
  ];

  return (
    <BrowseHeaderStyle as="header" aria-labelledby="browse_page_title">
      <BrowseHeaderInnerStyle>
        <Breadcrumbs currentPage={currentPage} />
        <BrowseHeaderTitleStyle id="browse_page_title">
          {i18n.t('browse.page_title')}
        </BrowseHeaderTitleStyle>
        <InnerPagesNavigation pages={BrowseNavigation} />
      </BrowseHeaderInnerStyle>
    </BrowseHeaderStyle>
  );
};
