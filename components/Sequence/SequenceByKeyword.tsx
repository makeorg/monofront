/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState } from 'react';
import { NoProposalCardType, QuestionType } from '@make.org/types';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { capitalizeFirstLetter } from '@make.org/utils/helpers/stringFormatter';
import { useParams } from 'react-router';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { isPushProposalCard } from '@make.org/utils/helpers/sequence';
import { CARD } from '@make.org/types/enums';
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
  const params: { encodedKeyword: string } = useParams();
  const { encodedKeyword } = params;
  const keyword = encodedKeyword && decodeURI(encodedKeyword);
  const [keywordLabel, setKeywordLabel] = useState<string>('');
  const question: QuestionType = selectCurrentQuestion(state);

  const executeStartSequence = async (
    questionId: string,
    votedIds: string[]
  ) => {
    const response = await SequenceService.startSequenceByKeyword(
      questionId,
      votedIds,
      keyword
    );

    setKeywordLabel(response?.label || '');

    return response?.proposals || [];
  };

  const { isLoading, currentCard, isEmptySequence } = useSequence(
    question,
    false,
    country,
    executeStartSequence
  );

  if (isLoading) {
    return <SequencePlaceholder />;
  }

  const noProposalCard: NoProposalCardType = {
    type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
    configuration: {
      title: i18n.t('no_proposal_card.title.keyword', {
        keyword: capitalizeFirstLetter(keywordLabel),
      }),
      description: i18n.t('no_proposal_card.description.special'),
    },
    index: 0,
  };

  const withProposalButton =
    question?.canPropose && !isPushProposalCard(currentCard);

  return (
    <>
      <MetaTags
        title={i18n.t('meta.sequence.title_keyword', {
          keywordLabel,
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
            {capitalizeFirstLetter(keywordLabel)}
          </SequenceSpecialTitleStyle>

          <SequenceCard
            card={currentCard || noProposalCard}
            question={question}
          />
          {!isEmptySequence && <SequenceProgress />}
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
