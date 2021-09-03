import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { SequenceTitleStyle } from '@make.org/components/Sequence/style';
import { SequenceParagraphStyle } from '@make.org/components/Sequence/Cards/style';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { setPanelContent } from '@make.org/store/actions/panel';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import { TriggerIconStyle } from '@make.org/components/Proposal/Submit/style';
import { RedButtonAsLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { LogoStyle, SidePanelContainer } from './style';

export const SidePanel: FC = () => {
  const { state, dispatch } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { unsecure } = state.appConfig;
  const canPropose = question.canPropose && !unsecure;

  return (
    <SidePanelContainer>
      <div>
        <h1>
          <LogoStyle focusable="false" aria-hidden />
          <ScreenReaderItemStyle>
            {i18n.t('header.logo_alt')}
          </ScreenReaderItemStyle>
        </h1>

        <SequenceTitleStyle>{question.question}</SequenceTitleStyle>
      </div>

      <SequenceParagraphStyle as="p" data-cy-container="final-card-description">
        {question.canPropose
          ? i18n.t('intro_card.description')
          : i18n.t('intro_card.description_short')}
      </SequenceParagraphStyle>
      {canPropose && (
        <RedButtonAsLinkStyle
          onClick={() => dispatch(setPanelContent(<ProposalJourney />))}
          data-cy-button="final-card-register-button"
        >
          <TriggerIconStyle aria-hidden focusable="false" />
          {i18n.t('proposal_submit.form.panel_trigger')}
        </RedButtonAsLinkStyle>
      )}
    </SidePanelContainer>
  );
};
