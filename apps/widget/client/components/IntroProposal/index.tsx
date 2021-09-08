import React, { FC, Dispatch, SetStateAction } from 'react';
import { ProposalType, QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import {
  SequenceCardStyle,
  SequenceProposalStyle,
} from '@make.org/components/Sequence/Cards/style';
import { CARD } from '@make.org/types/enums';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ProposalAuthor } from '@make.org/components/Proposal/Author';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';

type Props = {
  handleChange: Dispatch<SetStateAction<boolean>>;
};

export const IntroProposal: FC<Props> = ({ handleChange }) => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const proposal: ProposalType | null | undefined =
    question.activeFeatureData.topProposal;
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  if (!proposal) {
    return null;
  }

  return (
    <>
      <MetaTags
        title={i18n.t('meta.sequence.title_standard', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SequenceContainerStyle data-cy-container="sequence" className="widget">
        <SequenceContentStyle>
          <SequenceCardStyle
            id="card-top"
            data-cy-card-type={CARD.CARD_TYPE_PROPOSAL}
            data-cy-card-number={0}
            aria-live="polite"
            className={isWidget ? 'widget' : ''}
          >
            <ProposalAuthor proposal={proposal} isSequence />
            <ScreenReaderItemStyle>
              {i18n.t('top_proposal_card.content')}
            </ScreenReaderItemStyle>
            <SequenceProposalStyle
              lang={proposal.question.language}
              isWidget={isWidget}
            >
              {proposal.content}
            </SequenceProposalStyle>
            <RedButtonStyle
              onClick={() => handleChange(false)}
              id={`start-button-${proposal.id}`}
              data-cy-button="start-sequence"
            >
              {i18n.t('top_proposal_card.start')}
            </RedButtonStyle>
          </SequenceCardStyle>
          <SequenceProgress disabled />
        </SequenceContentStyle>
      </SequenceContainerStyle>
    </>
  );
};
