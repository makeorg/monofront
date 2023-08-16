import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ParticipateCardStyle,
  ParticipateCardAltTitleStyle,
  ParticipateCardAltDescriptionStyle,
  ParticipateCardExternalLinkStyle,
  ParticipateCardExternalIconStyle,
} from '@make.org/ui/elements/CardsElements';
import { MobileAboutStyle } from './style';

const About: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  return (
    <>
      <ParticipateCardAltTitleStyle>
        {i18n.t('consultation.cards.about.title')}
      </ParticipateCardAltTitleStyle>
      <ParticipateCardAltDescriptionStyle>
        {i18n.t('consultation.cards.about.description')}
      </ParticipateCardAltDescriptionStyle>
      <ParticipateCardExternalLinkStyle
        href={question.aboutUrl}
        target="_blank"
        rel="noopener"
      >
        {i18n.t('consultation.cards.about.link')}
        <ParticipateCardExternalIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </ParticipateCardExternalLinkStyle>
    </>
  );
};

export const DesktopAbout: FC = () => (
  <ParticipateCardStyle className="margin-bottom">
    <About />
  </ParticipateCardStyle>
);

export const MobileAbout: FC = () => (
  <MobileAboutStyle>
    <About />
  </MobileAboutStyle>
);
