import React, { FC } from 'react';
import i18n from 'i18next';
import { isBrowseConsultationsPage } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { TextStyleType } from '@make.org/designsystem/components/Typography/Text';
import { HomepageSectionTitleStyle } from '../../../pages/Home/style';
import {
  ConsultationsTitleWrapperStyle,
  ConsultationsSubtitleStyle,
  ConsultationElementSubtitleStyle,
} from './style';

type Props = {
  total: number;
  sectionTitleId: string;
};
export const BrowseConsultationsTitles: FC<Props> = ({
  total,
  sectionTitleId,
}) => {
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
      <ConsultationElementSubtitleStyle className={TextStyleType.condensed}>
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
