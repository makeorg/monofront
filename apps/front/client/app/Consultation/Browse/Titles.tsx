// #flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { HomepageSectionTitleStyle } from 'Client/pages/Home/style';
import { isBrowseConsultationsPage } from 'Shared/routes';
import { useLocation } from 'react-router';
import {
  ConsultationsTitleWrapperStyle,
  ConsultationsSubtitleStyle,
  ConsultationElementSubtitleStyle,
} from './style';

type Props = {
  total: number,
};
export const BrowseConsultationsTitles = ({ total, sectionTitleId }: Props) => {
  const location = useLocation();
  const consultationsPage = isBrowseConsultationsPage(location.pathname);
  const hasConsultations = total > 0;
  let subtitleText;

  if (consultationsPage) {
    subtitleText = i18n.t('browse.consultations.subtitle');
  }

  if (consultationsPage && !hasConsultations) {
    subtitleText = i18n.t('browse.consultations.empty');
  }

  if (!consultationsPage && !hasConsultations) {
    subtitleText = i18n.t('browse.results.empty');
  }

  if (!consultationsPage) {
    subtitleText = i18n.t('browse.results.subtitle');
  }

  return (
    <ConsultationsTitleWrapperStyle>
      <ConsultationElementSubtitleStyle>
        {consultationsPage
          ? i18n.t('browse.consultations.label')
          : i18n.t('browse.results.label')}
      </ConsultationElementSubtitleStyle>
      <HomepageSectionTitleStyle id={sectionTitleId}>
        {consultationsPage
          ? i18n.t('browse.consultations.title')
          : i18n.t('browse.results.title')}
      </HomepageSectionTitleStyle>
      <ConsultationsSubtitleStyle>{subtitleText}</ConsultationsSubtitleStyle>
    </ConsultationsTitleWrapperStyle>
  );
};
