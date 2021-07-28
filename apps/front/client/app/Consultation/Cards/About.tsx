// @flow
import React from 'react';
import { type QuestionType } from 'Shared/types/question';
import { i18n } from 'Shared/i18n';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { matchMobileDevice } from 'Shared/helpers/styled';
import {
  CardStyle,
  CardAltTitleStyle,
  CardAltDescriptionStyle,
  CardExternalLinkStyle,
  CardExternalIconStyle,
  MobileAboutStyle,
} from './style';

export const About = () => {
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const isMobile = matchMobileDevice(device);
  return (
    <>
      <CardAltTitleStyle as={isMobile ? 'h3' : 'h4'}>
        {i18n.t('consultation.cards.about.title')}
      </CardAltTitleStyle>
      <CardAltDescriptionStyle>
        {i18n.t('consultation.cards.about.description')}
      </CardAltDescriptionStyle>
      <CardExternalLinkStyle
        href={question.aboutUrl}
        target="_blank"
        rel="noopener"
      >
        {i18n.t('consultation.cards.about.link')}
        <CardExternalIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </CardExternalLinkStyle>
    </>
  );
};

export const DesktopAbout = () => (
  <CardStyle className="margin-bottom">
    <About />
  </CardStyle>
);

export const MobileAbout = () => (
  <MobileAboutStyle>
    <About />
  </MobileAboutStyle>
);
