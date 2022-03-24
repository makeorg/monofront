/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  getMetalTitleBySequenceKind,
  getNoProposalCard,
  getSequenceTitleBySequenceKind,
  isPushProposalCard,
  isStandardSequence,
} from '@make.org/utils/helpers/sequence';
import { QuestionType, SequenceType } from '@make.org/types';
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
  const { country, source } = state.appConfig;
  const { isLoading, sequenceSize } = state.sequence;
  const isWidget = source === 'widget';
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

  const withProposalButton =
    question?.canPropose && !isPushProposalCard(currentCard);

  return (
    <>
      <MetaTags
        title={i18n.t(getMetalTitleBySequenceKind(sequenceKind) || '', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SequenceContainerStyle
        data-cy-container="sequence"
        className={isWidget ? 'widget' : ''}
      >
        <SequenceContentStyle>
          {!isWidget && (
            <>
              {isStandardSequence(sequenceKind) ? (
                <SequenceTitleStyle>{question.question}</SequenceTitleStyle>
              ) : (
                <>
                  <SequenceAltTitleStyle>
                    {question.question}
                  </SequenceAltTitleStyle>
                  <SequenceSpecialTitleStyle>
                    <SequenceSpecialIconStyle aria-hidden focusable={false} />
                    {getSequenceTitleBySequenceKind(sequenceKind)}
                  </SequenceSpecialTitleStyle>
                </>
              )}
            </>
          )}
          <SequenceCard card={currentCard} question={question} />
          {!isEmptySequence && <SequenceProgress length={sequenceSize} />}
        </SequenceContentStyle>
        {!isWidget && (
          <ConsultationPageLinkStyle
            className={withProposalButton ? '' : 'static'}
            to={getParticipateLink(country || '', question.slug)}
            onClick={() => trackClickOperationPage()}
          >
            {i18n.t('sequence.more')}
          </ConsultationPageLinkStyle>
        )}
        {!isWidget && withProposalButton && <ProposalSubmit />}
      </SequenceContainerStyle>
    </>
  );
};
