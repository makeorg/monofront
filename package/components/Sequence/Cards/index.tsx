import React from 'react';
import {
  SequenceCardType,
  QuestionType,
  IntroCardConfigType,
  NoProposalCardConfigType,
  ProposalCardType,
  NoProposalCardType,
  DemographicDataType,
  FinalCardConfigType,
} from '@make.org/types';
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
import { DemographicsIntroCard } from './DemographicsIntro';
import { ProposalCard } from './Proposal';
import { NoProposal } from './NoProposal';
import { ExtraDataCard } from './ExtraData';

type CardProps = {
  /** Attribute of the card */
  card: SequenceCardType | NoProposalCardType;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

const Card: React.FC<CardProps> = ({ card, question }) => {
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
    case CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD: {
      if (isWidget) {
        return (
          <SpecialFinalCard
            questionSlug={question.slug}
            configuration={card.configuration as FinalCardConfigType}
          />
        );
      }
      return (
        <FinalCard
          questionSlug={question.slug}
          configuration={card.configuration as FinalCardConfigType}
        />
      );
    }
    case CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD: {
      return (
        <SpecialFinalCard
          questionSlug={question.slug}
          configuration={card.configuration as FinalCardConfigType}
        />
      );
    }
    case CARD.CARD_TYPE_EXTRASLIDE_INTRO_DEMOGRAPHICS_CARD: {
      return <DemographicsIntroCard />;
    }
    case CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD:
      return (
        <ExtraDataCard
          configuration={card.configuration as DemographicDataType}
        />
      );
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
  card: SequenceCardType | NoProposalCardType | null;
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
};

export const SequenceCard: React.FC<Props> = ({ card, question }) => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  if (!card) {
    return null;
  }

  const isNoProposalCard = card.type === CARD.CARD_TYPE_NO_PROPOSAL_CARD;
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSequenceProposal();

  let className = '';

  if (isWidget) {
    className = 'widget';
  }

  if (isNoProposalCard) {
    className = 'no-proposal';
  }

  return (
    <TopComponentContext.Provider value={topComponentContext}>
      <SequenceCardStyle
        className={className}
        id={`card-${card.index}`}
        data-cy-card-type={card.type}
        data-cy-card-number={!isNoProposalCard && card.index + 1}
        aria-live="polite"
      >
        <Card card={card} question={question} />
      </SequenceCardStyle>
    </TopComponentContext.Provider>
  );
};
