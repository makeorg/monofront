/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  trackClickNextOnLastProposal,
  trackClickNextCard,
} from '@make.org/utils/services/Tracking';
import { i18n } from '@make.org/utils/i18n';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import { ProposalCardType, VoteType } from '@make.org/types';
import { CARD_TYPE_PROPOSAL } from '@make.org/utils/constants/card';
import { useAppContext } from '@make.org/store';
import { Vote } from '../../Vote';
import { ProposalAuthor } from '../../Proposal/Author';
import { SequenceProposalStyle, SequenceNextCardButtonStyle } from './style';

type Props = {
  /** Proposal card */
  proposalCard: ProposalCardType;
};

/**
 * Handles Proposal Card Business Logic
 */
export const ProposalCard: React.FC<Props> = ({ proposalCard }) => {
  const { dispatch, state } = useAppContext();

  const [proposal, setProposal] = useState(proposalCard.configuration.proposal);
  const [index, setIndex] = useState(proposalCard.index);
  const { cards = [] } = state.sequence || {};
  const { votes = [] } = cards[index].state ? cards[index].state : {};
  const [isVoted, setIsVoted] = useState(
    votes.some((vote: VoteType) => vote.hasVoted === true)
  );

  const getLastCardIndex = () => {
    const allProposals = cards.filter(card => card.type === CARD_TYPE_PROPOSAL);
    const lastCard = allProposals.pop();
    if (lastCard) {
      return lastCard.index;
    }
    return 0;
  };
  const [isLastProposalCard, setIsLastProposalCard] = useState(
    proposalCard.index === getLastCardIndex()
  );

  useEffect(() => {
    setProposal(proposalCard.configuration.proposal);
    setIndex(proposalCard.index);
    setIsLastProposalCard(proposalCard.index === getLastCardIndex());
  }, [proposalCard, cards]);

  useEffect(() => {
    setIsVoted(votes.some(vote => vote.hasVoted === true));
  }, [votes]);

  const goToNextCard = () => {
    dispatch(incrementSequenceIndex());
    if (isLastProposalCard) {
      return trackClickNextOnLastProposal();
    }
    return trackClickNextCard();
  };

  return (
    <>
      <ProposalAuthor proposal={proposal} isSequence />
      <ScreenReaderItemStyle>
        {i18n.t('proposal_card.content')}
      </ScreenReaderItemStyle>
      <SequenceProposalStyle lang={proposal.question.language}>
        {proposal.content}
      </SequenceProposalStyle>
      <Vote
        proposal={proposal}
        votes={votes}
        proposalKey={proposal.proposalKey}
        index={index}
        isSequence
      />
      {isVoted && (
        <SequenceNextCardButtonStyle
          onClick={goToNextCard}
          id={`next-button-${proposal.id}`}
          data-cy-button="next-proposal"
        >
          {isLastProposalCard
            ? i18n.t('proposal_card.validate')
            : i18n.t('proposal_card.next')}
        </SequenceNextCardButtonStyle>
      )}
    </>
  );
};
