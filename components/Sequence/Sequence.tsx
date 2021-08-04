/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  getNoProposalCardTitleBySequenceKind,
  getSequenceTitleBySequenceKind,
  isPushProposalCard,
  isStandardSequence,
} from '@make.org/utils/helpers/sequence';
import { SEQUENCE, CARD } from '@make.org/types/enums';

import {
  NoProposalCardType,
  ProposalType,
  QuestionType,
} from '@make.org/types';
import i18n from 'i18next';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { SequenceService } from '@make.org/utils/services/Sequence';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '../MetaTags';
import { ProposalSubmit } from '../Proposal/Submit';
import { SequenceCard } from './Cards';
import { SequenceProgress } from './Progress';
import { SequencePlaceholder } from './Placeholder';
import { useSequence } from './Hooks/useSequence';
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
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);

  const executeStartSequence = async (
    questionId: string,
    votedIds: string[]
  ): Promise<ProposalType[] | null> => {
    const results = await SequenceService.startSequenceByKind(
      questionId,
      votedIds,
      sequenceKind
    );
    if (!!results && 'proposals' in results) {
      return results.proposals;
    }
    return null;
  };

  const { isLoading, currentCard, isEmptySequence } = useSequence(
    question,
    isStandardSequence(sequenceKind),
    country,
    executeStartSequence
  );

  if (isLoading) {
    return <SequencePlaceholder />;
  }

  const noProposalCard: NoProposalCardType = {
    type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
    configuration: {
      title: getNoProposalCardTitleBySequenceKind(sequenceKind) || '',
      description: isStandardSequence(sequenceKind)
        ? i18n.t('no_proposal_card.description.regular')
        : i18n.t('no_proposal_card.description.special'),
    },
    index: 0,
  };

  const getMetaTitle = () => {
    if (sequenceKind === SEQUENCE.KIND_STANDARD) {
      return 'meta.sequence.title_standard';
    }
    if (sequenceKind === SEQUENCE.KIND_CONTROVERSY) {
      return 'meta.sequence.title_controversy';
    }
    if (sequenceKind === SEQUENCE.KIND_CONSENSUS) {
      return 'meta.sequence.title_popular';
    }

    return null;
  };

  const withProposalButton =
    question?.canPropose && !isPushProposalCard(currentCard);

  return (
    <>
      <MetaTags
        title={i18n.t(getMetaTitle() || '', {
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
            card={
              !isEmptySequence && !!currentCard ? currentCard : noProposalCard
            }
            question={question}
          />
          {!isEmptySequence && <SequenceProgress />}
        </SequenceContentStyle>
        <ConsultationPageLinkStyle
          className={withProposalButton ? '' : 'static'}
          to={getParticipateLink(country || '', question.slug)}
          onClick={() => trackClickOperationPage()}
        >
          {i18n.t('sequence.more')}
        </ConsultationPageLinkStyle>
        {withProposalButton && <ProposalSubmit />}
      </SequenceContainerStyle>
    </>
  );
};
