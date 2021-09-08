import React, { useEffect } from 'react';
import {
  SequenceCardType,
  QuestionType,
  IntroCardConfigType,
  NoProposalCardConfigType,
  ProposalCardType,
  NoProposalCardType,
} from '@make.org/types';
import { trackDisplayNoProposalSequence } from '@make.org/utils/services/Tracking';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { CARD } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
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
  card: SequenceCardType | NoProposalCardType;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

export const Card: React.FC<CardProps> = ({ card, question }) => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  switch (card.type) {
    case CARD.CARD_TYPE_PROPOSAL:
      return <ProposalCard proposalCard={card as ProposalCardType} />;
    case CARD.CARD_TYPE_EXTRASLIDE_INTRO:
      return (
        <IntroCard configuration={card.configuration as IntroCardConfigType} />
      );
    case CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL:
      return <PushProposalCard />;
    case CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD:
      return <FinalCard questionSlug={question.slug} />;
    case CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD: {
      if (isWidget) {
        return <FinalCard questionSlug={question.slug} />;
      }
      return <SpecialFinalCard questionSlug={question.slug} />;
    }
    case CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD:
      return <ExtraDataCard />;
    case CARD.CARD_TYPE_NO_PROPOSAL_CARD: {
      const { title, description } =
        card.configuration as NoProposalCardConfigType;
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
  card: SequenceCardType | NoProposalCardType;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

export const SequenceCard: React.FC<Props> = ({ card, question }) => {
  const isProposalCard = card.type === CARD.CARD_TYPE_PROPOSAL;
  const isNoProposalCard = card.type === CARD.CARD_TYPE_NO_PROPOSAL_CARD;
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSequenceProposal();
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

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
          className={isWidget ? 'widget' : ''}
          id={`card-${card.index}`}
          data-cy-card-type={card.type}
          data-cy-card-number={!isNoProposalCard && card.index + 1}
          aria-live="polite"
          isNoProposalCard={isNoProposalCard}
          isProposalCard={isProposalCard}
        >
          <Card card={card} question={question} />
        </SequenceCardStyle>
      </TopComponentContext.Provider>
    </>
  );
};
