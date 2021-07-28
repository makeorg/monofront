// @flow
import React from 'react';
import {
  InnerPagesNavigation,
  type PageNavigationType,
} from 'Client/features/navigation/Pages';
import { useSelector } from 'react-redux';
import { getExploreLink, getParticipateLink } from 'Shared/helpers/url';
import { i18n } from 'Shared/i18n';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { type QuestionType } from 'Shared/types/question';
import { useParams } from 'react-router';
import { CONSULTATION_NAVIGATION } from 'Shared/constants/ids';
import { scrollToElementId, matchDesktopDevice } from 'Shared/helpers/styled';
import {
  trackClickExploreTab,
  trackClickParticipateTab,
} from 'Shared/services/Tracking';
import { NavigationWrapperStyle, NavigationInnerStyle } from './style';

export const ParticipateNavigation = () => {
  const { country, pageId } = useParams();
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const isDesktop = matchDesktopDevice(device);
  const NavigationPages: PageNavigationType[] = [
    {
      onClickAction: () => {
        scrollToElementId(CONSULTATION_NAVIGATION);
        trackClickParticipateTab();
      },
      link: getParticipateLink(country, question.slug),
      label: isDesktop
        ? i18n.t('consultation.navigation.participate_desktop')
        : i18n.t('consultation.navigation.participate_mobile'),
      routeToMatch: getParticipateLink(country, question.slug),
    },
    {
      onClickAction: () => {
        scrollToElementId(CONSULTATION_NAVIGATION);
        trackClickExploreTab();
      },
      link: getExploreLink(country, question.slug),
      label: isDesktop
        ? i18n.t('consultation.navigation.explore_desktop')
        : i18n.t('consultation.navigation.explore_mobile'),
      routeToMatch: getExploreLink(country, question.slug, pageId),
    },
  ];

  return (
    <NavigationWrapperStyle>
      <NavigationInnerStyle>
        <InnerPagesNavigation pages={NavigationPages} />
      </NavigationInnerStyle>
    </NavigationWrapperStyle>
  );
};
