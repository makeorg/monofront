import React, { useEffect } from 'react';
import {
  SequenceCardType,
  QuestionType,
  IntroCardConfigType,
  NoProposalCardConfigType,
} from '@make.org/types';
import {
  CARD_TYPE_EXTRASLIDE_INTRO,
  CARD_TYPE_PROPOSAL,
  CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL,
  CARD_TYPE_EXTRASLIDE_FINAL_CARD,
  CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD,
  CARD_TYPE_NO_PROPOSAL_CARD,
  CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
} from '@make.org/utils/constants/card';
import { trackDisplayNoProposalSequence } from '@make.org/utils/services/Tracking';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { SequenceCardStyle } from './style';
import { IntroCard } from './Intro';
import { PushProposalCard } from './PushProposal';
import { FinalCard } from './Final';
import { SpecialFinalCard } from './SpecialFinal';
import { ProposalCard } from './Proposal';
import { NoProposal } from './NoProposal';
import { ExtraDataCard } from './ExtraData';

type CardProps = {
  /** Attribute of the card */
  card: SequenceCardType;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

export const Card: React.FC<CardProps> = ({ card, question }) => {
  switch (card.type) {
    case CARD_TYPE_PROPOSAL:
      return <ProposalCard proposalCard={card} />;
    case CARD_TYPE_EXTRASLIDE_INTRO:
      return (
        <IntroCard configuration={card.configuration as IntroCardConfigType} />
      );
    case CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL:
      return <PushProposalCard />;
    case CARD_TYPE_EXTRASLIDE_FINAL_CARD:
      return <FinalCard />;
    case CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD:
      return <SpecialFinalCard />;
    case CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD:
      return <ExtraDataCard />;
    case CARD_TYPE_NO_PROPOSAL_CARD: {
      const { title, description } = card.configuration as NoProposalCardConfigType;
      return (
        <NoProposal
          question={question}
          title={title}
          description={description}
        />
      );
    }
    default:
      return null;
  }
};

type Props = {
  /** Attribute of the card */
  card: SequenceCardType;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

export const SequenceCard: React.FC<Props> = ({ card, question }) => {
  const isProposalCard = card.type === CARD_TYPE_PROPOSAL;
  const isNoProposalCard = card.type === CARD_TYPE_NO_PROPOSAL_CARD;
  const topComponentContext: TopComponentContextValueType = TopComponentContextValue.getSequenceProposal();

  useEffect(() => {
    if (isNoProposalCard) {
      trackDisplayNoProposalSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopComponentContext.Provider value={topComponentContext}>
        <SequenceCardStyle
          className={!isProposalCard && 'center'}
          id={`card-${card.index}`}
          data-cy-card-type={card.type}
          data-cy-card-number={!isNoProposalCard && card.index + 1}
          aria-live="polite"
          isNoProposalCard={isNoProposalCard}
        >
          <Card card={card} question={question} />
        </SequenceCardStyle>
      </TopComponentContext.Provider>
    </>
  );
};
