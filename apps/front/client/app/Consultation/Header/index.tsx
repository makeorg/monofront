import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import i18n from 'i18next';
import {
  getBrowseConsultationsLink,
  getBrowseResultsLink,
} from '@make.org/utils/helpers/url';
import { QuestionType, PartnerType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { PARTNER } from '@make.org/types/enums';
import { isResultsPage } from '@make.org/utils/routes';
import { getCurrentLabel } from '../../../helpers/consultation';
import {
  Breadcrumbs,
  BreadcrumbsPagesType,
} from '../../Breadcrumbs/Breadcrumbs';
import {
  HeaderWrapperStyle,
  HeaderContentStyle,
  HeaderWrapperLabelStyle,
  HeaderLabelStyle,
  HeaderTitleStyle,
} from './style';
import { PartnersList } from './PartnerLink';

export const ParticipateHeader: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const founders: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind === PARTNER.FOUNDER_PARTNER
      )
    : [];
  const partners: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind !== PARTNER.FOUNDER_PARTNER
      )
    : [];
  const isFeatured = question.featured === true;
  const location = useLocation();
  const resultsPage = isResultsPage(location.pathname);
  const parentPages = [
    resultsPage
      ? {
          name: i18n.t('browse.results.all'),
          link: getBrowseResultsLink(country),
        }
      : {
          name: i18n.t('browse.consultations.all'),
          link: getBrowseConsultationsLink(country),
        },
  ];

  const breadcrumbLabel = getCurrentLabel(location.pathname, question);

  const currentPage: BreadcrumbsPagesType = {
    name: breadcrumbLabel,
    link: location.pathname,
  };

  return (
    <HeaderWrapperStyle>
      <HeaderContentStyle as="header">
        <Breadcrumbs parentPages={parentPages} currentPage={currentPage} />
        <HeaderTitleStyle>
          <HeaderWrapperLabelStyle as="span">
            <HeaderLabelStyle className="white-text">
              {isFeatured
                ? i18n.t('consultation.header.label_great_cause')
                : i18n.t('consultation.header.label_consultation')}
            </HeaderLabelStyle>
            {resultsPage && (
              <HeaderLabelStyle className="margin-left black-text">
                {i18n.t('consultation.header.label_results')}
              </HeaderLabelStyle>
            )}
          </HeaderWrapperLabelStyle>
          <ScreenReaderItemStyle> - </ScreenReaderItemStyle>
          {question.question}
        </HeaderTitleStyle>
        {founders.length > 0 && (
          <PartnersList
            partnersList={founders}
            title={i18n.t('consultation.partners.init')}
          />
        )}
        {partners.length > 0 && (
          <PartnersList
            partnersList={partners}
            title={i18n.t('consultation.partners.with')}
            seeMoreLink
            noMargin
          />
        )}
      </HeaderContentStyle>
    </HeaderWrapperStyle>
  );
};
