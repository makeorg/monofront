import React, { FC, useState } from 'react';
import { QuestionType, SequenceType } from '@make.org/types';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { useParams } from 'react-router';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  isPushProposalCard,
  setNoProposalsCard,
} from '@make.org/utils/helpers/sequence';
import { SequenceService } from '@make.org/utils/services/Sequence';
import { useAppContext } from '@make.org/store';
import { ProposalSubmit } from '@make.org/components/Proposal/Submit';
import { useSequence } from './Hooks/useSequence';
import { SequencePlaceholder } from './Placeholder';
import { SequenceProgress } from './Progress';
import {
  SequenceContainerStyle,
  ConsultationPageLinkStyle,
  SequenceContentStyle,
  SequenceAltTitleStyle,
  SequenceSpecialIconStyle,
  SequenceSpecialTitleStyle,
} from './style';
import { SequenceCard } from './Cards';
import { MetaTags } from '../MetaTags';

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const SequenceByKeyword: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { isLoading, sequenceSize } = state.sequence;
  const isEmptySequence = sequenceSize === 0;
  const params: { encodedKeyword: string } = useParams();
  const { encodedKeyword } = params;
  const keyword = encodedKeyword && decodeURI(encodedKeyword);
  const [sequenceLabel, setSequenceLabel] = useState<string>('');

  const question: QuestionType = selectCurrentQuestion(state);

  const executeStartSequence = async (
    questionId: string,
    votedIds: string[],
    preferedLanguage?: string
  ): Promise<SequenceType | null> => {
    const response = await SequenceService.startSequenceByKeyword(
      questionId,
      votedIds,
      keyword,
      preferedLanguage
    );
    if (!response) {
      return null;
    }
    if (response.label) {
      setSequenceLabel(response.label);
    }
    return {
      proposals: response.proposals || [],
      length: response.length,
    };
  };

  const noProposalCard = setNoProposalsCard(sequenceLabel);

  const { currentCard } = useSequence(
    question,
    false,
    executeStartSequence,
    noProposalCard
  );

  if (isLoading) {
    return <SequencePlaceholder />;
  }

  const withProposalButton =
    question?.canPropose && !isPushProposalCard(currentCard);

  return (
    <>
      <MetaTags
        title={i18n.t('meta.sequence.title_keyword', {
          keywordLabel: sequenceLabel,
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SequenceContainerStyle data-cy-container="sequence">
        <SequenceContentStyle>
          <SequenceAltTitleStyle>{question.question}</SequenceAltTitleStyle>
          <SequenceSpecialTitleStyle>
            <SequenceSpecialIconStyle aria-hidden focusable={false} />
            {sequenceLabel}
          </SequenceSpecialTitleStyle>
          <SequenceCard
            card={isEmptySequence ? noProposalCard : currentCard}
            question={question}
          />
          {!isEmptySequence && <SequenceProgress length={sequenceSize} />}
        </SequenceContentStyle>
        <ConsultationPageLinkStyle
          className={!withProposalButton ? 'static' : ''}
          to={getParticipateLink(country, question.slug)}
          onClick={trackClickOperationPage}
        >
          {i18n.t('sequence.more')}
        </ConsultationPageLinkStyle>
        {withProposalButton && <ProposalSubmit />}
      </SequenceContainerStyle>
    </>
  );
};
