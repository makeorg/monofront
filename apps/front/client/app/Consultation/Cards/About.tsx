import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import {
  CardStyle,
  CardAltTitleStyle,
  CardAltDescriptionStyle,
  CardExternalLinkStyle,
  CardExternalIconStyle,
  MobileAboutStyle,
} from './style';

export const About: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { device } = state.appConfig;
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

export const DesktopAbout: FC = () => (
  <CardStyle className="margin-bottom">
    <About />
  </CardStyle>
);

export const MobileAbout: FC = () => (
  <MobileAboutStyle>
    <About />
  </MobileAboutStyle>
);
