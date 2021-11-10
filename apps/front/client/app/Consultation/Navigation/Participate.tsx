import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import {
  getExploreLink,
  getParticipateLink,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { useParams } from 'react-router';
import { IDS } from '@make.org/types/enums';
import {
  scrollToElementId,
  matchDesktopDevice,
} from '@make.org/utils/helpers/styled';
import {
  trackClickExploreTab,
  trackClickParticipateTab,
} from '@make.org/utils/services/Tracking';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import {
  InnerPagesNavigation,
  PageNavigationType,
} from '../../Navigation/Pages';
import { NavigationWrapperStyle, NavigationInnerStyle } from './style';

export const ParticipateNavigation: FC = () => {
  const { country, pageId } = useParams<{ country: string; pageId: string }>();
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);
  const NavigationPages: PageNavigationType[] = [
    {
      onClickAction: () => {
        scrollToElementId(IDS.CONSULTATION_NAVIGATION);
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
        scrollToElementId(IDS.CONSULTATION_NAVIGATION);
        trackClickExploreTab();
      },
      link: getExploreLink(country, question.slug, 1, {
        sort: SORT_RECENT,
      }),
      label: isDesktop
        ? i18n.t('consultation.navigation.explore_desktop')
        : i18n.t('consultation.navigation.explore_mobile'),
      routeToMatch: getExploreLink(country, question.slug, Number(pageId)),
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
