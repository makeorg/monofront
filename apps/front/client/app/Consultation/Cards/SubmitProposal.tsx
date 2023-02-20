import React, { FC } from 'react';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import { useAppContext } from '@make.org/store';
import {
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
  ParticipateCardDescriptionStyle,
  ParticipateCardButtonStyle,
} from '@make.org/ui/elements/CardsElements';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';

export const SubmitProposal: FC = () => {
  const { state, dispatch } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

  return (
    <ParticipateCardStyle className="margin-bottom">
      <SvgLightBulb aria-hidden width={31} height={31} focusable="false" />
      <ParticipateCardTitleStyle>
        {i18n.t('consultation.cards.submit.title')}
      </ParticipateCardTitleStyle>
      <ParticipateCardDescriptionStyle>
        {i18n.t('consultation.cards.submit.description')}
      </ParticipateCardDescriptionStyle>
      <ParticipateCardButtonStyle
        onClick={() => {
          dispatch(clearProposalPending());
          dispatch(setPanelContent(<ProposalJourney />));
        }}
        data-cy-button="proposal-button"
        disabled={!question.canPropose}
      >
        {i18n.t('consultation.cards.submit.button')}
      </ParticipateCardButtonStyle>
    </ParticipateCardStyle>
  );
};
