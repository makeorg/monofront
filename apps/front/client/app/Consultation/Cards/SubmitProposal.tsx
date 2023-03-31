import React, { FC } from 'react';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import {
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
  ParticipateCardDescriptionStyle,
  ParticipateCardButtonStyle,
  ParticipateCardCantProposalTextStyle,
} from '@make.org/ui/elements/CardsElements';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';

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
          dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_JOURNEY));
        }}
        data-cy-button="proposal-button"
        disabled={!question.canPropose}
      >
        {i18n.t('consultation.cards.submit.button')}
      </ParticipateCardButtonStyle>
      {!question.canPropose && (
        <ParticipateCardCantProposalTextStyle>
          {i18n.t('common.notifications.vote_only.message', {
            title: question.question,
          })}
        </ParticipateCardCantProposalTextStyle>
      )}
    </ParticipateCardStyle>
  );
};
