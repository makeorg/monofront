import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { SequenceTitleStyle } from '@make.org/components/Sequence/style';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { setPanelContent } from '@make.org/store/actions/panel';
import { TriggerIconStyle } from '@make.org/components/Proposal/Submit/style';
import { isInProgress } from '@make.org/utils/helpers/date';
import {
  clearProposalPending,
  setProposalSource,
} from '@make.org/store/actions/pendingProposal';
import {
  isStandardSequence,
  isConsensusSequence,
} from '@make.org/utils/helpers/sequence';
import controversyIcon from '@make.org/assets/images/controversyIcon.png';
import popularIcon from '@make.org/assets/images/popularIcon.png';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  MainTitleStyle,
  LogoStyle,
  PanelContainer,
  ProposeButtonStyle,
  KindLabelWrapperStyle,
  KindLabelTextStyle,
  KindLabelPopularIconStyle,
  KindLabelControversyIconStyle,
  InnerPanelWrapperStyle,
} from './style';

export const HeaderPanel: FC = () => {
  const { state, dispatch } = useAppContext();
  const { sequenceKind } = state.sequence;
  const isConsensusSequenceKind =
    sequenceKind && isConsensusSequence(sequenceKind);
  const isStandardSequenceKind = sequenceKind
    ? isStandardSequence(sequenceKind)
    : true;
  const question: QuestionType = selectCurrentQuestion(state);
  const { unsecure } = state.appConfig;
  const canPropose = question.canPropose && !unsecure && isInProgress(question);
  return (
    <PanelContainer>
      <MainTitleStyle>
        <LogoStyle focusable="false" aria-hidden />
        <ScreenReaderItemStyle>
          {i18n.t('header.logo_alt')}
        </ScreenReaderItemStyle>
      </MainTitleStyle>
      <SequenceTitleStyle className="widget">
        {question.question}
      </SequenceTitleStyle>
      <InnerPanelWrapperStyle>
        {canPropose && (
          <ProposeButtonStyle
            className="widget"
            onClick={() => {
              dispatch(clearProposalPending());
              dispatch(setProposalSource('from-header-panel'));
              dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_JOURNEY));
            }}
            data-cy-button="proposal-panel"
          >
            <TriggerIconStyle aria-hidden focusable="false" />
            {i18n.t('proposal_submit.form.panel_trigger')}
          </ProposeButtonStyle>
        )}
        {sequenceKind && !isStandardSequenceKind && (
          <KindLabelWrapperStyle>
            {isConsensusSequenceKind ? (
              <KindLabelPopularIconStyle src={popularIcon} alt="" />
            ) : (
              <KindLabelControversyIconStyle src={controversyIcon} alt="" />
            )}
            <KindLabelTextStyle>
              {isConsensusSequenceKind
                ? i18n.t('sequence_zone.popular_title')
                : i18n.t('sequence_zone.controversial_title')}
            </KindLabelTextStyle>
          </KindLabelWrapperStyle>
        )}
      </InnerPanelWrapperStyle>
    </PanelContainer>
  );
};
