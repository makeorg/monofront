/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getNoProposalCard } from '@make.org/utils/helpers/sequence';
import { NoProposalCardType, QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { SequenceCard } from '@make.org/components/Sequence/Cards';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';

type Props = {
  /** kind parameter for popular and controversy sequences */
  sequenceKind: string;
};

/**
 * Renders First Proposal
 */
export const FirstProposal: React.FC<Props> = ({ sequenceKind }) => {
  const { state } = useAppContext();
  const { sequenceSize, cards } = state.sequence;
  const isEmptySequence = sequenceSize === 0;
  const question: QuestionType = selectCurrentQuestion(state);
  const noProposalCard: NoProposalCardType = getNoProposalCard(sequenceKind);

  return (
    <SequenceContainerStyle data-cy-container="sequence" className="widget">
      <SequenceContentStyle>
        <SequenceCard card={cards[0] || noProposalCard} question={question} />
        {!isEmptySequence && <SequenceProgress length={sequenceSize} />}
      </SequenceContentStyle>
    </SequenceContainerStyle>
  );
};
