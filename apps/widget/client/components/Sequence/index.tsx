/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  getNoProposalCard,
  isStandardSequence,
} from '@make.org/utils/helpers/sequence';
import { QuestionType, SequenceType } from '@make.org/types';
import { SequenceService } from '@make.org/utils/services/Sequence';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { SequenceCard } from '@make.org/components/Sequence/Cards';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import { SequencePlaceholder } from '@make.org/components/Sequence/Placeholder';
import { useSequence } from '@make.org/components/Sequence/Hooks/useSequence';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';

export type Props = {
  /** kind parameter for popular and controversy sequences */
  sequenceKind: string;
};

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const Sequence: React.FC<Props> = ({ sequenceKind }) => {
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const { isLoading, sequenceSize } = state.sequence;
  const isEmptySequence = sequenceSize === 0;
  const question: QuestionType = selectCurrentQuestion(state);
  const executeStartSequence = async (
    questionId: string,
    votedIds: string[],
    demographicCardId?: string,
    token?: string
  ): Promise<SequenceType | null> => {
    const response = await SequenceService.startSequenceByKind(
      questionId,
      votedIds,
      sequenceKind,
      language,
      demographicCardId,
      token
    );

    if (!response) {
      return null;
    }

    const { proposals, demographics } = response;
    return {
      proposals: proposals || [],
      demographics,
      length: proposals.length,
    };
  };

  const { currentCard } = useSequence(
    question,
    isStandardSequence(sequenceKind),
    executeStartSequence,
    getNoProposalCard(sequenceKind)
  );

  if (isLoading) {
    return <SequencePlaceholder />;
  }

  return (
    <SequenceContainerStyle data-cy-container="sequence" className="widget">
      <SequenceContentStyle>
        <SequenceCard card={currentCard} question={question} />
        {!isEmptySequence && <SequenceProgress length={sequenceSize} />}
      </SequenceContentStyle>
    </SequenceContainerStyle>
  );
};
