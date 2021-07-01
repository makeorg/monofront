/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  getNoProposalCardTitleBySequenceKind,
  getSequenceTitleBySequenceKind,
  isStandardSequence,
} from '@make.org/utils/helpers/sequence';
import {
  KIND_CONTROVERSY,
  KIND_POPULAR,
  KIND_STANDARD,
} from '@make.org/utils/constants/sequence';
import { CARD_TYPE_NO_PROPOSAL_CARD } from '@make.org/utils/constants/card';
import { QuestionType } from '@make.org/types';
import { i18n } from '@make.org/utils/i18n';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { SequenceService } from '@make.org/utils/services/Sequence';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { MetaTags } from '../MetaTags';
import { ProposalSubmit } from '../Proposal/Submit';
import { SequenceCard } from './Cards';

// REST TO DO
import { SequenceProgress } from './Progress';
import { SequencePlaceholder } from './Placeholder';
import { useSequence } from './Hooks/useSequence';

import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';

import {
  SequenceContainerStyle,
  ConsultationPageLinkStyle,
  SequenceContentStyle,
  SequenceAltTitleStyle,
  SequenceSpecialIconStyle,
  SequenceSpecialTitleStyle,
  SequenceTitleStyle,
} from './style';

export type Props = {
  /** kind parameter for popular and controversy sequences */
  sequenceKind: string;
};

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const Sequence: React.FC<Props> = ({ sequenceKind }) => {
  const [isSequenceEmpty, setIsSequenceEmpty] = useState(false);

  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );

  const executeStartSequence = async (
    questionId: string,
    votedIds: string[]
  ) => {
    const { proposals } = await SequenceService.startSequenceByKind(
      questionId,
      votedIds,
      sequenceKind
    );
    setIsSequenceEmpty(proposals.length === 0);

    return proposals || [];
  };
  const { withProposalButton, country, isLoading, currentCard } = useSequence(
    question,
    isStandardSequence(sequenceKind),
    executeStartSequence
  );

  if (isLoading) {
    return <SequencePlaceholder />;
  }

  const noProposalCard = {
    type: CARD_TYPE_NO_PROPOSAL_CARD,
    configuration: {
      title: getNoProposalCardTitleBySequenceKind(sequenceKind),
      description: isStandardSequence(sequenceKind)
        ? i18n.t('no_proposal_card.description.regular')
        : i18n.t('no_proposal_card.description.special'),
    },
  };

  const getMetaTitle = () => {
    if (sequenceKind === KIND_STANDARD) {
      return 'meta.sequence.title_standard';
    }
    if (sequenceKind === KIND_CONTROVERSY) {
      return 'meta.sequence.title_controversy';
    }
    if (sequenceKind === KIND_POPULAR) {
      return 'meta.sequence.title_popular';
    }

    return null;
  };
  return (
    <>
      <MetaTags
        title={i18n.t(getMetaTitle(), {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SequenceContainerStyle data-cy-container="sequence">
        <SequenceContentStyle>
          {isStandardSequence(sequenceKind) ? (
            <SequenceTitleStyle>{question.question}</SequenceTitleStyle>
          ) : (
            <>
              <SequenceAltTitleStyle>{question.question}</SequenceAltTitleStyle>
              <SequenceSpecialTitleStyle>
                <SequenceSpecialIconStyle aria-hidden focusable={false} />
                {getSequenceTitleBySequenceKind(sequenceKind)}
              </SequenceSpecialTitleStyle>
            </>
          )}
          <SequenceCard
            card={isSequenceEmpty ? noProposalCard : currentCard}
            question={question}
          />
          {!isSequenceEmpty && <SequenceProgress />}
        </SequenceContentStyle>
        <ConsultationPageLinkStyle
          className={!withProposalButton && 'static'}
          to={getParticipateLink(country, question.slug)}
          onClick={() => trackClickOperationPage()}
        >
          {i18n.t('sequence.more')}
        </ConsultationPageLinkStyle>
        {withProposalButton && <ProposalSubmit />}
      </SequenceContainerStyle>
    </>
  );
};
