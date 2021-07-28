// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { type StateRoot } from 'Shared/store/types';
import { useLocation, useParams } from 'react-router';
import {
  getBrowseConsultationsLink,
  getBrowseResultsLink,
} from 'Shared/helpers/url';
import {
  type BreadcrumbsPagesType,
  Breadcrumbs,
} from 'Client/app/Breadcrumbs/Breadcrumbs';
import { isBrowseConsultationsPage } from 'Shared/routes';
import {
  InnerPagesNavigation,
  type PageNavigationType,
} from 'Client/features/navigation/Pages';
import { useSelector } from 'react-redux';
import { matchDesktopDevice } from 'Shared/helpers/styled';
import {
  BrowseHeaderStyle,
  BrowseHeaderInnerStyle,
  BrowseHeaderTitleStyle,
} from './style';

export const BrowseConsultationsHeader = () => {
  const location = useLocation();
  const { country, pageId } = useParams();
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const consultationsPage = isBrowseConsultationsPage(location.pathname);
  const isDesktop = matchDesktopDevice(device);

  const currentPage: BreadcrumbsPagesType = {
    name: consultationsPage
      ? i18n.t('browse.nav_consultations_desktop')
      : i18n.t('browse.nav_results_desktop'),
    link: location,
  };

  const BrowseNavigation: PageNavigationType[] = [
    {
      link: getBrowseConsultationsLink(country),
      label: isDesktop
        ? i18n.t('browse.nav_consultations_desktop')
        : i18n.t('browse.nav_consultations_mobile'),
      routeToMatch: getBrowseConsultationsLink(country, pageId),
    },
    {
      link: getBrowseResultsLink(country),
      label: isDesktop
        ? i18n.t('browse.nav_results_desktop')
        : i18n.t('browse.nav_results_mobile'),
      routeToMatch: getBrowseResultsLink(country, pageId),
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
