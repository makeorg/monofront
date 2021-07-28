// @flow
import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Breadcrumbs } from 'Client/app/Breadcrumbs/Breadcrumbs';
import { i18n } from 'Shared/i18n';
import {
  getBrowseConsultationsLink,
  getBrowseResultsLink,
} from 'Shared/helpers/url';
import { getCurrentLabel } from 'Shared/helpers/consultation';
import { type QuestionType, type PartnerType } from 'Shared/types/question';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { FOUNDER_PARTNER } from 'Shared/constants/partner';
import { isResultsPage } from 'Shared/routes';
import {
  HeaderWrapperStyle,
  HeaderContentStyle,
  HeaderWrapperLabelStyle,
  HeaderLabelStyle,
  HeaderTitleStyle,
} from './style';
import { PartnersList } from './PartnerLink';

export const ParticipateHeader = () => {
  const { country } = useSelector((state: StateRoot) => state.appConfig);
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const founders: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind === FOUNDER_PARTNER
      )
    : [];
  const partners: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind !== FOUNDER_PARTNER
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
    link: location,
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
